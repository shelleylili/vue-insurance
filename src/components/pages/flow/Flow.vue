<template>
  <div class="flowshow">
    <Flow :src="flowShowSrc" :rt="link"></Flow>
  </div>
</template>

<script>
  import Flow from '../../chunks/Flow'
  import { HOME_FLOW_SHOW_SRC } from '../../../consts'

  export default {
    name: 'Flowshow',
    data () {
      return {
        flowShowSrc: '',
        link: ''
      }
    },
    created () {
      this.flowShowSrc = HOME_FLOW_SHOW_SRC
    },
    components: {
      Flow,
      HOME_FLOW_SHOW_SRC
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss">
  .home {
    height: 100vh;
    background:#eeeeee;
    .weui-cells.vux-no-group-title {
      margin-top: 0;
      box-shadow: 0 0px 5px 2px #dddd;
      z-index: 10;
      background:#ffffff;
      .weui-cell_access{
        padding:10px;
      }
      .vux-tap-active:active,.vux-tap-active:active{
        background:#ffffff;
      }
    }
    .vux-cell-bd {
      .vux-label {
        color:transparent;
        height:24px;
        background: url('../../../../static/images/home-h-bg.png') no-repeat;
        background-size:contain;
      }
    }
    .weui-cell__ft {
      position: relative;
      color:#666666;
      font-size:12px;
      &::before {
        display: block;
        position: absolute;
        left: -30px;
        top: -5px;
        width: 28px;
        height: 28px;
        content: '';
        background: url('../../../../static/images/home-h-icon.png') no-repeat;
        background-size: contain;
      }
    }
    .vux-flexbox:first-child{
      .flex-item{
        margin-top:0;
      }
    }
    .vux-flexbox:nth-child(2) .vux-flexbox-item:nth-child(4) {
      .weui-tabbar__icon {
        img {
          width: 32px;
          margin-left: -2px;
        }
      }
    }
    .wrapper{
      padding:12px;
      margin-top:10px;
      background:#ffffff;
    }
    .none-mt{
      margin-top:0;
    }
  }
</style>
