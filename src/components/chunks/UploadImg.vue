<template>
  <div class="uploadImg" rel="up-root">
    <flexbox :gutter="0" v-for="(item, index) in uploadList" :key="index" ref="item">
      <flexbox-item :span="8">
        <div class="wrapper border-half">
          <input accept="image/*" type="file" @change="item.upload" class="input">
          <img alt="暂无图片" class="showImg" :src="item.src" width="189px" height="124px">
          <div class="texts" :class="{'show': !item.isUploaded}">
            <div class="title f18">{{item.title}}</div>
            <div class="sub f15">（文字清晰，四角齐全）</div>
          </div>
        </div>
      </flexbox-item>
      <flexbox-item :span="4">
        <flexbox orient="vertical" :gutter="0">
          <flexbox-item>
            <div class="icon">
              <img :src="item.zoomIcon" alt="放大" width="24px" height="24px"/>
              <img class="previewer-demo-img" v-for="(ii, ind) in item.list" :src="ii.src" width="36px"
                   @click="show(index,ind)">
              <div v-transfer-dom>
                <previewer :list="item.list" ref="previewer" :options="options"></previewer>
              </div>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="icon">
              <img :src="item.delIcon" alt="放大" width="24px" height="24px" @click="del(index)"/>
            </div>
          </flexbox-item>
        </flexbox>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
  import { Flexbox, FlexboxItem, Previewer, TransferDom } from 'vux'
  import { showToast, postAPI } from '../../util'
  import bus from '../../bus'

  export default {
    name: 'UploadImg',
    props: {
      upList: {
        type: Array,
        value: []
      }
    },
    data () {
      return {
        uploadList: this.upList,
        options: {
          getThumbBoundsFn (index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        }
      }
    },
    created () {
      let that = this
      this.uploadList[0].list = []
      this.uploadList[1].list = []
      this.uploadList[0].list[0] = {}
      this.uploadList[1].list[0] = {}
      this.$nextTick(() => {
        this.uploadList[0].list[0].src = this.$refs.item[0].$el.getElementsByClassName('showImg')[0].src
        this.uploadList[1].list[0].src = this.$refs.item[1].$el.getElementsByClassName('showImg')[0].src
      })
      bus.$on('front', function (base64) {
        that.uploadList[0].list[0].src = base64
        that.$refs.item[0].$el.getElementsByClassName('showImg')[0].src = base64
        // that.$refs.item[0].$el.getElementsByClassName('previewer-demo-img')[0].src = base64
        that.uploadList[0].isUploaded = true
      })
      bus.$on('back', function (base64) {
        that.uploadList[1].list[0].src = base64
        that.$refs.item[1].$el.getElementsByClassName('showImg')[0].src = base64
        // that.$refs.item[1].$el.getElementsByClassName('previewer-demo-img')[0].src = base64
        that.uploadList[1].isUploaded = true
      })
    },
    methods: {
      del: function (index) {
        this.$refs.item[index].$el.getElementsByClassName('showImg')[0].src = this.upList[index].src
        this.uploadList[index].list[0].src = this.upList[0].src
        this.uploadList[index].isUploaded = false
      },
      show (index, ind) {
        this.options.getThumbBoundsFn(ind)
        if (index === 0) {
          this.$refs.previewer[0].show(ind)
        } else if (index === 1) {
          this.$refs.previewer[1].show(ind)
        }
//        ev.target.nextSibling.children[0].show(index)
      }
    },
    components: {
      postAPI,
      showToast,
      Flexbox,
      FlexboxItem,
      Previewer,
      TransferDom
    },
    directives: {
      TransferDom
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss">
  .uploadImg {
    .wrapper {
      position: relative;
      padding: 10px 15px;
      border: 1px dashed #dcdcdc;
      text-align: center;
      background: #ffffff;
    }
    .wrapper > .texts {
      margin-top: -12px;
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
    .wrapper > .input {
      display: block;
      position: absolute;
      left: 15px;
      top: 10px;
      width: 189px;
      height: 124px;
      background: transparent;
      -webkit-appearance: none;
      border: 0;
      outline: none;
      font-size: 0;
    }
    .icon {
      position: relative;
      display: inline-block;
      margin: 19px 0;
      padding: 12px;
      .previewer-demo-img {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        width: 48px;
        height: 48px;
      }
    }
    /* reset */
    .vux-flexbox:nth-child(2){
      margin-top:15px;
    }
    .vux-flex-col > .vux-flexbox-item {
      text-align: center;
    }
  }
</style>
