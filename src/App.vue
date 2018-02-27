<template>
  <div id="app">
    <!--Header></Header-->
    <transition name="left" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import TabBar from './components/chunks/TabBar'

export default {
  name: 'app',
  data () {
    return {}
  },
  components: {
    TabBar
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './assets/sass/common.scss';

body {
  background-color: #fbf9fe;
}

</style>
