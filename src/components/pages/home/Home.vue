<template>
  <div class="home">
    <!--header-->
    <group>
      <cell title="**" link="/login" :value="value"></cell>
    </group>
    <!--滚屏-->
    <Swiper :list="imgList"></Swiper>
    <!--Menu-->
    <div class="wrapper none-mt">
      <Menu></Menu>
    </div>
    <!--flow-->
    <div class="wrapper">
      <Flow :src="flowSrc" :rt="link"></Flow>
    </div>
  </div>
</template>

<script>
  import { Group, Cell } from 'vux'
  import Swiper from '../../chunks/Swiper'
  import Menu from '../../chunks/Menu'
  import Flow from '../../chunks/Flow'
  import { SWIPER_IMG_LIST, HOME_FLOW_SRC, HOME_FLOW_LINK } from '../../../consts'
  import bus from '../../../bus'

  export default {
    name: 'Home',
    data () {
      return {
        imgList: [], // swiper 图片地址数组
        flowSrc: '',
        value: '游客，未登录',
        link: ''
      }
    },
    mounted () {
      // 判断是否登录过
      let that = this
      bus.$on('savedUser', function () {
        let user = JSON.parse(localStorage.getItem('user'))
        that.value = '欢迎：' + user.mobile
      })
      bus.$on('realChecked', function () {
        let user = JSON.parse(localStorage.getItem('user'))
        that.value = '欢迎：' + user.mobile
      })
    },
    created () {
      this.imgList = SWIPER_IMG_LIST
      this.flowSrc = HOME_FLOW_SRC
      this.link = HOME_FLOW_LINK
      let user = JSON.parse(localStorage.getItem('user'))
      if (user && user.id) {
        this.value = '欢迎：' + user.mobile
      }
    },
    components: {
      Swiper,
      Menu,
      Cell,
      Group,
      Flow
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
