<template>
  <div class="login">
    <div class="pad-top"></div>
    <div class="content">
      <!-- header -->
      <div class="header">
        <div class="icon"></div>
        <span class="text"><span>-</span><span class="right">-</span>欢迎登录<span>-</span><span
          class="right">-</span></span>
      </div>
      <!-- title -->
      <div class="title border-half f16">手机快捷登录</div>
      <!-- form -->
      <div class="form">
        <div class="form-control" :class="{'active':isPhoneActive}">
          <label class="label f14">手机号码</label>
          <x-input v-model="phoneVal" name="mobile" keyboard="number" :is-type="checkPhone" placeholder="请输入手机号码"
                   required></x-input>
        </div>
        <div class="form-control checkcode" :class="{'active':isCodeActive}">
          <label class="label f14">验证码</label>
          <flexbox>
            <flexbox-item :span="7">
              <x-input v-model="checkCodeVal" name="checkcode" keyboard="number" :is-type="checkCode"
                       placeholder="请输入验证码" required></x-input>
            </flexbox-item>
            <flexbox-item :span="5">
              <x-button type="default" class="not-check f15" v-if="!isChecked" @click.native="sendCheckCode">
                {{checkCodeText}}
              </x-button>
              <x-button type="default" class="checked f15" v-if="isChecked">{{checkCodeText}}</x-button>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
    </div>
    <!-- login-btn -->
    <Button :clickHandler="login" :text="text"></Button>
  </div>
</template>

<script>
  import { XInput, XButton, Flexbox, FlexboxItem, ToastPlugin } from 'vux'
  import { isPhoneNum, isCheckCode, postAPI, showToast } from '../../../util'
  import bus from '../../../bus'
  import Button from '../../chunks/Button'

  export default {
    name: 'login',
    data () {
      return {
        phoneVal: '', // 手机号双向绑定
        checkCodeVal: '', // 验证码双向绑定
        isPhoneActive: isPhoneNum(this.phoneVal) && this.phoneVal, // 手机号格式和非空校验成功class值
        isCodeActive: isCheckCode(this.checkCodeVal) && this.checkCodeVal, // 验证码格式和非空校验成功class值
        isChecked: false, // 验证码发送 不发送
        checkCodeText: this.isChecked ? '60秒后再次获取' : '获取手机验证码', // 验证码按钮切换文字
        gotCheckCode: {},  // 发送验证码返回的数据
        successLogin: {},  // 登录之后的返回数据
        clickChecked: false, //  是否点击过发送验证码按钮
        text: '登录' // 登录按钮文本
      }
    },
    watch: {
      phoneVal: function (newVal, oldVal) {
        this.isPhoneActive = isPhoneNum(newVal) && this.phoneVal
      },
      checkCodeVal: function (newVal, oldVal) {
        this.isCodeActive = isCheckCode(newVal) && this.checkCodeVal
      }
    },
    methods: {
      // istype方式校验手机号
      checkPhone: function (value) {
        this.phoneVal = value
        return {
          valid: isPhoneNum(value),
          msg: '手机号格式不正确'
        }
      },
      // istype方式校验手机验证码
      checkCode: function (value) {
        this.checkCodeVal = value
        return {
          valid: isCheckCode(value),
          msg: '验证码格式(4位数字)不正确'
        }
      },
      // 发送验证码
      sendCheckCode: function (e) {
        if (this.phoneVal && this.isPhoneActive) {
          this.isChecked = this.clickChecked = true
          let [wait, that] = [60, this]
          let timmer = null
          // 校验是否可以发送验证码
          var timer = function () {
            if (wait <= 1) {
              wait = 60
              clearInterval(timmer)
              that.isChecked = false
              that.checkCodeText = that.isChecked ? wait + '秒后再次获取' : '获取手机验证码'
            } else {
              wait--
              that.checkCodeText = that.isChecked ? wait + '秒后再次获取' : '获取手机验证码'
              clearInterval(timmer)
              timmer = setInterval(function () {
                timer()
              }, 1000)
            }
          }
          showToast(this, '验证码已经发送至手机了~', '20em')
          timer()
        } else {
          // 提示手机号没有填写就发送验证码
          showToast(this, '请填写手机号~')
        }
        // 发送验证码
        postAPI({
          params: {
            lastUrl: '/user/mobile',
            data: {
              mobile: this.phoneVal
            }
          },
          context: this,
          successFun: function (result) {
            this.gotCheckCode = result.body
            console.log(result)
          },
          failFun: function (result) {
            this.gotCheckCode = result.body
            console.log(this.gotCheckCode)
            console.log('error:' + this.gotCheckCode.msg)
          }
        })
      },
      // 登录
      login: function (e) {
        // 手机号填写校验
//        if (this.isPhoneActive) {
//          // 验证码填写校验
//          if (this.isCodeActive) {
//            // 发送过验证码动作校验
//            if (this.clickChecked) {
//              // 发送验证码成功了
//              if (this.gotCheckCode.code) {
//                console.log('发送成功')
//                // 登录
//                postAPI({
//                  params: {
//                    lastUrl: '/user/login',
//                    data: {
//                      mobile: this.phoneVal,
//                      code: this.checkCodeVal
//                    }
//                  },
//                  context: this,
//                  successFun: function (result) {
//                    this.successLogin = result.body
//                    if (this.successLogin.code) {
//                      // 第一次微信授权
//                      // 授权成功后跳转首页
//                      this.loginSuccessRedirect(this.successLogin.data)
//                    } else {
//                      showToast(this, this.successLogin.msg)
//                    }
//                  },
//                  failFun: function (result) {
//                    this.successLogin = result.body
//                    console.log(this.successLogin.msg)
//                    showToast(this, this.successLogin.msg)
//                  }
//                })
//              } else {
//                showToast(this, this.gotCheckCode.msg)
//              }
//            } else {
//              showToast(this, '还没有发送验证码到手机', '16em')
//            }
//          } else {
//            showToast(this, '请填写验证码')
//          }
//        } else {
//          showToast(this, '请填写手机号')
//        }
        this.loginSuccessRedirect({
          id: '1001',
          mobile: '13589228390',
          isRealChecked: false
        })
      },
      // 登录成功后的跳转和处理
      loginSuccessRedirect: function (user) {
        console.log('登陆成功')
        // 存user本地
        localStorage.setItem('user', JSON.stringify(user))
        // 发出已保存用户信息事件
        if (localStorage.getItem('user')) {
          bus.$emit('savedUser')
        }
        // 跳转首页
        this.$router.push({path: '/home'})
      }
    },
    components: {
      XInput,
      XButton,
      Flexbox,
      FlexboxItem,
      ToastPlugin,
      Button
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss">
  .login {
    display: block;
    width: 100%;
    height: 100%;
    background: url('../../../../static/images/login-bg.jpg') repeat-y;
    background-size: cover;
  }

  .pad-top {
    padding-top: 65px;
  }

  .content {
    margin: 0 18px 0 18px;
    background: #ffffff;
    border-radius: 4px;
    .header {
      position: relative;
      padding-top: 36px;
      margin-bottom: 40px;
      font-size: 24px;
      color: #ff6253;
      text-align: center;
      .icon {
        display: block;
        position: absolute;
        left: 25px;
        bottom: 0;
        width: 27px;
        height: 45px;
        background: url('../../../../static/images/login-icon.png') no-repeat;
        background-size: contain;
      }
      .text {
        display: inline-block;
        line-height: 1;
      }
    }
    .title {
      padding-bottom: 15px;
      border-bottom: 1px solid #eeeeee;
      text-align: center;
      color: #666666;
    }
    .form {
      padding: 10px 14px 35px 14px;
      margin-bottom: 45px;
      .form-control {
        padding-top: 24px;
        .label {
          display: block;
          padding-bottom: 12px;
          color: #999999;
        }

        /* reset components style */
        .weui-cell {
          padding: 0;
          &::before {
            border: none;
          }
        }
        .weui-cell__ft {
          position: absolute;
          right: 10px;
        }
        .weui-input {
          width: 100%;
          border: 0;
          outline: 0;
          -webkit-appearance: none;
          background-color: #fcf8f8;
          font-size: inherit;
          color: inherit;
          padding: 17px 15px;
          border: 1px solid #dcdcdc;
          border-radius: 4px;
          box-sizing: border-box;
          color: #333333;
          height: auto;
          line-height: 1;
          font-size: 14px;
        }
        &.active {
          .vux-input-icon.weui_icon_success {
            display: inline-block !important;
          }
          .weui-input {
            background: #f7fef8;
          }
        }
        @media (-webkit-min-device-pixel-ratio: 2) {
          .weui-input {
            border-width: 0.5px;
          }
        }
        @media (-webkit-min-device-pixel-ratio: 3) {
          .weui-input {
            border-width: 0.3px;
          }
        }
        .not-check, .checked {
          line-height: 1;
          padding: 19px 0;
        }
        .not-check {
          color: #ff6253;
          background: #ffffff;
          &::after {
            border-color: #ff6253 !important;
          }
        }
        .checked {
          color: #999999;
          background: #eeeeee;
          &::after {
            border-color: #bfbfbf;
          }
        }
        &.checkcode {
          .vux-flexbox-item:nth-child(2) {
            flex: auto !important;
            margin-left: 11px !important;
          }
        }
      }
    }
  }

  .login-wrapper {
    padding: 0 18px;
    .login-btn.weui-btn {
      padding: 16px 0;
      color: #ffffff;
      background: #ff6253;
      line-height: 1;
      height: auto;
    }
  }
</style>
