<template>
  <div class="flow border-half">
    <router-link :to="link">
      <span style="font-size:15px;text-align: center;display:block;">Loading</span>
      <x-img :src="imgSrc" :webp-src="`${imgSrc}?type=webp`" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="-30" container="#vux_view_box_body"></x-img>
    </router-link>
  </div>
</template>

<script>
  import { XImg, Group } from 'vux'
  export default {
    name: 'Flow', // 和vux组件同名会有maxsize....溢出错误
    props: {
      src: {
        type: String,
        value: ''
      },
      rt: {
        type: String,
        value: ''
      }
    },
    data () {
      return {
        imgSrc: '',
        link: '/login'
      }
    },
    created () {
      this.imgSrc = this.src
      this.link = this.rt
    },
    methods: {
      success (src, ele) {
        console.log('success load', src)
        const span = ele.parentNode.querySelector('span')
        ele.parentNode.removeChild(span)
      },
      error (src, ele, msg) {
        console.log('error load', msg, src)
        const span = ele.parentNode.querySelector('span')
        span.innerText = 'load error'
      }
    },
    components: {
      XImg,
      Group
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss">
  .flow{
    border-radius:10px;
    border:1px solid #dcdcdc;
    .ximg-demo {
      width: 100%;
      height: auto;
      border-radius:10px;
    }
    .ximg-error {
      background-color: yellow;
    }
    .ximg-error:after {
      content: '加载失败';
      color: red;
    }
  }
</style>
