<template>
  <div>
    <transition name="left" mode="out-in">
      <keep-alive>
        <router-view></router-view> <!--嵌套路由-->
      </keep-alive>
    </transition>
    <!--底部tabbar -->
    <TabBar :tabDatas="tabDatas"></TabBar>
  </div>
</template>

<script>
  import TabBar from '../chunks/TabBar'
  import { TABBAR_LIST } from '../../consts'

  export default {
    name: 'index',
    data () {
      return {
        tabDatas: [] // tabbar内容数组
      }
    },
    created () {
      this.tabDatas = TABBAR_LIST
    },
    components: {
      TabBar
    }
  }
</script>

<style></style>
