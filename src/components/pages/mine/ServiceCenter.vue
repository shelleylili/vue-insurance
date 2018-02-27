<template>
  <div class="ServiceCenter">
    <!-- 下拉加载更多 上拉刷新 -->
    <scroller lock-x scrollbar-y use-pullup use-pulldown :height="height" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
      <div class="box2">
        <group :title="HTitle" >
          <cell v-for="(q,index) in list" :key="index" :link="q.router" :title="q.desc"></cell>
        </group>
      </div>
      <!--pullup slot-->
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
        <span v-show="status.pullupStatus === 'default'"></span>
        <span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
        <span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      </div>
    </scroller>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell, Panel, Scroller, Divider, XSwitch, Spinner } from 'vux'
import { getQuestions } from '../../../api'

export default {
  name: 'ServiceCenter',
  data () {
    return {
      HTitle: '热门问题',
      list: [],
      page: 1,
      pullupEnabled: true,
      status: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      },
      height: (window.innerHeight - 100) + 'px'
    }
  },
  created () {
    getQuestions(this, 'list', this.page)
  },
  methods: {
    loadMore () {
      setTimeout(() => {
        this.page += 1
        // 获取商家列表
        getQuestions(this, 'list', this.page)
        setTimeout(() => {
          this.$refs.scroller.donePullup()
        }, 10)
      }, 2000)
    },
    refresh () {
      setTimeout(() => {
        this.page = 1
        getQuestions(this, 'list', this.page)
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scroller.donePulldown()
            this.pullupEnabled && this.$refs.scroller.enablePullup()
          }, 10)
        })
      }, 2000)
    }
  },
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell,
    Panel,
    Scroller,
    Divider,
    XSwitch,
    Spinner
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
