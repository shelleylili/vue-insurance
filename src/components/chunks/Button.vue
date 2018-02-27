<template>
  <div class="btn">
    <div class="login-wrapper">
      <x-button type="default" class="login-btn f18" @click.native="clickHandler">{{text}}</x-button>
    </div>
  </div>
</template>

<script>
  import { XButton } from 'vux'

  export default {
    name: 'Button', // 和vux组件同名会有maxsize....溢出错误
    props: {
      clickHandler: {
        type: Function,
        value: function () {}
      },
      text: {
        type: String,
        value: 'Button'
      }
    },
    data () {
      return {
        clickFun: this.clickHandler
      }
    },
    components: {
      XButton
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss">
  .btn {
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
  }
</style>
