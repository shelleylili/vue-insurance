<template>
  <div class="tabpanel">
    <tabbar>
      <tabbar-item v-for="(item,index) in list" :key="index" :selected="index === 0" :link="item.link">
        <img slot="icon" :src="item.src">
        <img slot="icon-active" :src="item.onSrc">
        <span slot="label">{{item.label}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem, Group, Cell } from 'vux'

  export default {
    name: 'TabBar',
    props: {
      tabDatas: {
        type: Array,
        value: []
      }
    },
    data () {
      return {
        list: []
      }
    },
    created () {
      this.list = this.tabDatas
    },
    components: {
      Tabbar,
      TabbarItem,
      Group,
      Cell
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/scss" lang="scss">
  .tabpanel {
    .weui-tabbar {
      position: fixed;
      box-shadow: 0 -2px 5px #dddddd;
    }
    .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
      color: #ff6253;
    }
  }
</style>
