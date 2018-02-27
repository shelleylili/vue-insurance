<template>
  <div class="fastpy">
    <!-- 流程step图示 -->
    <FlowStep></FlowStep>
    <!--流程步骤路由-->
    <router-view></router-view>
  </div>
</template>

<script>
  import { Flow, FlowState, FlowLine } from 'vux'
  import FlowStep from '../../chunks/FlowStep'

  export default {
    name: 'Fastpy',
    data () {
      return {
      }
    },
    methods: {
    },
    components: {
      Flow,
      FlowState,
      FlowLine,
      FlowStep
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss">
  .card-padding {
    padding: 15px;
  }
</style>
