<template>
  <div class="step1">
    <!-- 身份证回显card -->
    <group>
      <cell title="姓名" :value="idInfos.name" class="text"></cell>
      <cell title="身份证号" :value="idInfos.code" class="text"></cell>
    </group>
    <group>
      <cell>
        <span slot="title" class="text">身份证认证照片</span>
      </cell>
      <flexbox class="pad-lr">
        <flexbox-item>
          <div class="flex-demo">
            <div class="flex-demo wrapper border-half">
              <img alt="暂无图片" :src="idFrontSrc" class="showImg" width="137px" height="78px">
              <div class="texts" :class="{'show':isShow}">
                <div class="title f16">身份证正面</div>
                <div class="sub f12">（文字清晰，四角齐全）</div>
              </div>
            </div>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo wrapper border-half">
            <img alt="暂无图片" :src="idBackSrc" class="showImg" width="137px" height="78px">
            <div class="texts" :class="{'show':isShow}">
              <div class="title f16">身份证反面</div>
              <div class="sub f12">（文字清晰，四角齐全）</div>
            </div>
          </div>
        </flexbox-item>
      </flexbox>
    </group>
    <!--下一步 -->
    <Button :clickHandler="next" :text="text"></Button>
  </div>
</template>

<script>
  import { Cell, Group, Flexbox, FlexboxItem } from 'vux'
  import Button from '../../chunks/Button'
  import bus from '../../../bus'

  export default {
    name: 'Step1',
    data () {
      return {
        text: '下一步', // 下一步按钮文字
        idInfos: {},
        idFrontSrc: '../../../../static/images/rc-id-front.jpg', // 身份证正面
        idBackSrc: '../../../../static/images/rc-id-back.jpg', // 身份证反面
        isShow: true
      }
    },
    mounted () {
      bus.$on('realChecked', (user) => {
        this.formateIdStr(user)
        this.idFrontSrc = user.idInfos.front
        this.idBackSrc = user.idInfos.back
        this.isShow = false
      })
    },
    created () {
      let user = JSON.parse(localStorage.getItem('user'))
      this.formateIdStr(user)
      if (user && user.isRealChecked) {
        this.idFrontSrc = user.idInfos.front
        this.idBackSrc = user.idInfos.back
        this.isShow = false
      }
    },
    methods: {
      next: function () {
        this.$router.push('/step2')
        bus.$emit('fastpy2', '理赔凭证')
      },
      formateIdStr: function (user) {
        if (user && user.isRealChecked) {
          this.idInfos = user.idInfos
          let starCount = this.idInfos.code.length - 10
          let str = ''
          for (let i = 0; i < starCount; i++) {
            str += '*'
          }
          this.idInfos.code = this.idInfos.code.substr(0, 6) + str + this.idInfos.code.substr(-4, 4)
        }
      }
    },
    components: {
      Group,
      Button,
      Cell,
      Flexbox,
      FlexboxItem
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss">
  @import '../../../assets/sass/common.scss';
  .step1 {
    .card-padding {
      padding: 15px;
    }
    .text {
      font-size: 14px;
      color: #000000;
    }
    .pad-lr {
      padding: 0 17px;
    }
    .wrapper {
      position: relative;
      padding: 10px 0;
      border: 1px dashed #dcdcdc;
      text-align: center;
      background: #ffffff;
    }
    .wrapper > .texts {
      margin-top: -17px;
      text-align: center;
      opacity: 0;
      .title {
        padding-bottom: 8px;
        color: #666666;
      }
      .sub {
        color: #999999;
      }
      &.show {
        opacity: 1;
      }
    }
    .vux-flexbox{
      width:auto;
      padding-bottom: 17px;
    }
    .vux-flexbox-item:nth-child(2){
      margin-left:22px!important;
    }
  }
</style>
