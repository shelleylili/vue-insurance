<template>
  <div class="swiper">
    <swiper :list="swiperList" auto style="width:100%;margin:0 auto;" :aspect-ratio="300/800" dots-class="custom-bottom"
            dots-position="center"></swiper>
  </div>
</template>

<script>
  import { Swiper } from 'vux'

  export default {
    name: 'SwiperBanner', // 和vux组件同名会有maxsize....溢出错误
    props: {
      list: {
        type: Array,
        value: []
      }
    },
    data () {
      return {
        swiperList: []
      }
    },
    created () {
      this.swiperList = this.list.map((one, index) => ({
        url: 'javascript:',
        img: one
      }))
    },
    components: {
      Swiper
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss">
  .swiper{
    .vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-swiper-desc{
      background:none;
    }
  }
</style>
