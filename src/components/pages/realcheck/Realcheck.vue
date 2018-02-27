<template>
  <div class="realcheck">
    <!-- 头部img -->
    <Flow :src="top.flowSrc" :rt="top.link"></Flow>
    <!-- 上传id图片 -->
    <div class="content">
      <!-- 上传id正反面 -->
      <div class="item">
        <upload-img :upList="upload" ref="upload"></upload-img>
      </div>
    </div>
    <!-- 下一步 -->
    <Button :clickHandler="next" class="next-btn" :text="text"></Button>
  </div>
</template>
<script>
  import Flow from '../../chunks/Flow'
  import { REALCHECK_SRC } from '../../../consts'
  import { showToast, postAPI, failDeal, successDeal, showConfirm } from '../../../util'
  import UploadImg from '../../chunks/UploadImg'
  import Button from '../../chunks/Button'
  import bus from '../../../bus'

  export default {
    name: 'Realcheck',
    data () {
      return {
        top: {
          flowSrc: '', // 顶部图片src
          link: '' // 顶部图片路由
        },
        text: '验证',
        upload: [
          {
            isUploaded: false, //  id正面是否上传成功
            upload: function () {},
            title: '',
            src: '',
            zoomIcon: '',
            delIcon: '',
            base64: ''
          },
          {
            isUploaded: false, //  id反面是否上传成功
            upload: function () {},
            title: '',
            src: '',
            zoomIcon: '',
            delIcon: '',
            base64: ''
          }
        ],
        idInfos: {} // 身份证信息(正反)
      }
    },
    created () {
      let that = this
      // 设置头部图片
      this.top.flowSrc = REALCHECK_SRC
      this.upload[0].title = '身份证正面'
      this.upload[0].src = '../../../static/images/rc-id-front.jpg'
      this.upload[1].title = '身份证反面'
      this.upload[1].src = '../../../static/images/rc-id-back.jpg'
      this.upload[0].zoomIcon = this.upload[1].zoomIcon = '../../../static/images/rc-zoom.png'
      this.upload[0].delIcon = this.upload[1].delIcon = '../../../static/images/rc-del.png'
      // 设置上传id正面
      this.upload[0].upload = function (e) {
        that.uploadCommon({
          ev: e, // input change事件
          emitName: 'front', // 上传发送的事件名
          type: 1, // 上传正反面类型 1 证明  2 反面
          successFun: function (result) {
            successDeal(result,
              function () {
                that.upload[0].isUploaded = true
                // 回显
                bus.$emit('front', that.upload[0].base64)
                that.idInfos.front = result.body.data
                showToast(that, '上传成功')
                console.log(that.idInfos.front)
              },
              function () {
                that.$router.push('/login')
              },
              function () {
                failDeal(that, result)
              })
          },
          failFun: function (result) {
            failDeal(that, result)
          }
        })
      }
      // 设置上传id反面
      this.upload[1].upload = function (e) {
        that.uploadCommon({
          ev: e, // input change事件
          emitName: 'back', // 上传发送的事件名
          type: 2, // 上传正反面类型 1 证明  2 反面
          successFun: function (result) {
            successDeal(result,
              function () {
                that.upload[1].isUploaded = true
                bus.$emit('back', that.upload[1].base64)
                that.idInfos.back = result.body.data
                showToast(that, '上传成功')
                console.log(that.idInfos.back)
              },
              function () {
                that.$router.push('/login')
              },
              function () {
                failDeal(that, result)
              })
          },
          failFun: function (result) {
            failDeal(that, result)
          }
        })
      }
    },
    methods: {
      uploadCommon: function (options) {
        let {ev, type, successFun, failFun} = options
        for (let i = 0; i < ev.target.files.length; i++) {
          let file = ev.target.files[0]
          if (!(/^image\/.*$/i.test(file.type))) {
            continue // 不是图片 就跳出这一次循环
          }
          // 实例化FileReader API
          let freader = new FileReader()
          let that = this
          freader.readAsDataURL(file)
          freader.onload = function (e) {
            if (type === 1) {
              that.upload[0].base64 = e.target.result
            } else if (type === 2) {
              that.upload[1].base64 = e.target.result
            }
            // 上传后台
            let params = {
              params: {
                lastUrl: '/idupload',
                data: {
                  file: e.target.result, // base64
                  type: type
                }
              },
              context: that,
              successFun: successFun,
              failFun: failFun
            }
            postAPI(params)
          }
        }
      },
      next: function () {
        let that = this
        if (this.idInfos.front) {
          if (this.idInfos.back) {
            let contentText = '<div style="text-align: left;padding:0 15px;"<h2><span>姓名：</span>' + this.idInfos.front.name +
              '</h2><h2><span>身份证号：</span>' + this.idInfos.front.name + '</h2>' +
              '<h2><span>有效日期：</span>' + this.idInfos.back.start + '-' + this.idInfos.back.end +
              '</h2><h2><span>发证机关：</span>' + this.idInfos.back.orgnazation + '</h2></div>'
            showConfirm(this, {
              title: '核实识别信息',
              content: contentText,
              confirmText: '确定信息',
              cancelText: '重新拍摄',
              cancelHandler: function () {
                console.log('重新拍摄')
              },
              confirmHandler: function () {
                if (localStorage.getItem('user')) {
                  let user = JSON.parse(localStorage.getItem('user'))
                  user.isRealChecked = true
                  user.idInfos = {
                    name: '****',
                    code: '152103198904202222',
                    front: that.upload[0].base64,
                    back: that.upload[1].base64
                  }
                  localStorage.setItem('user', JSON.stringify(user))
                  // 发送已实名认证事件
                  bus.$emit('realChecked', user)
                }
                console.log('实名认证成功')
                that.$router.push({path: '/home'})
              }
            })
          } else {
            showToast(this, '请上传身份证背面图片', '15em')
          }
        } else {
          showToast(this, '请上传身份证正面图片', '15em')
        }
      }
    },
    components: {
      Flow,
      REALCHECK_SRC,
      UploadImg,
      Button
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss">
  .realcheck {
    .flow.border-half {
      border-radius: 0;
      border: none;
    }
    .flow .ximg-demo {
      border-radius: 0;
    }
    .content {
      margin:auto!important;
      padding: 15px;
      background: #ffffff;
      .item {
        margin-bottom: 15px;
      }
    }
    .next-btn{
      margin-top:15px;
    }
  }
</style>
