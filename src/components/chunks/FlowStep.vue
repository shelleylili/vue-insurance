<template>
  <div class="flow-step">
    <!-- 流程step图示 -->
    <flow>
      <flow-state state="1" :title="showText(steps[0].title)" is-done></flow-state>
      <flow-line :is-done="steps[0].isDone" v-if="steps[0].isDone"></flow-line>
      <flow-line :tip="showText(steps[0].tip)" v-if="!steps[0].isDone"></flow-line>

      <flow-state state="2" :title="showText(steps[1].title)" :is-done="steps[1].isComplete"></flow-state>
      <flow-line :is-done="steps[1].isDone" v-if="steps[1].isDone"></flow-line>
      <flow-line :tip="showText(steps[1].tip)" v-if="!steps[1].isDone"></flow-line>

      <flow-state state="3" :title="showText(steps[2].title)" :is-done="steps[2].isDone"></flow-state>
    </flow>
  </div>
</template>

<script>
  import { Flow, FlowState, FlowLine } from 'vux'
  import bus from '../../bus'

  export default {
    name: 'FlowStep', // 和vux组件同名会有maxsize....溢出错误
    created () {
      bus.$on('fastpy2', (stepName) => {
        this.steps[1].title = stepName
        this.steps[1].isComplete = true
        this.steps[1].tip = '进行中'
        this.steps[0].isDone = true
      })
      bus.$on('fastpy3', (stepName) => {
        this.steps[2].title = stepName
        this.steps[2].isDone = true
        this.steps[1].isDone = true
      })
    },
    data () {
      return {
        steps: [
          {
            isDone: false,
            title: '基本信息',
            tip: '进行中'
          },
          {
            isDone: false,
            title: '理赔凭证',
            tip: '',
            isComplete: false
          },
          {
            isDone: false,
            title: '启动理赔',
            tip: ''
          }
        ],
        showText: function (value) {
          return value
        }
      }
    },
    components: {
      Flow,
      FlowState,
      FlowLine
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss">
  .flow-step {
    /* reset */
    .weui-wepay-flow__li {
      width: 41px;
      height: 41px;
      .weui-wepay-flow__state {
        width: 41px;
        height: 41px;
        color: transparent;
      }
    }
    .weui-wepay-flow__li_done {
      .weui-wepay-flow__state {
        width: 41px;
        height: 41px;
        color: transparent;
      }
    }
    .weui-wepay-flow__li:nth-child(3) .weui-wepay-flow__state {
      background: url('../../../static/images/fy-step2.png') no-repeat;
      background-size: contain;
    }
    .weui-wepay-flow__li:last-child .weui-wepay-flow__state {
      background: url('../../../static/images/fy-step3.png') no-repeat;
      background-size: contain;
    }
    .weui-wepay-flow__li_done .weui-wepay-flow__title-bottom {
      color: #ff6253;
    }
    .weui-wepay-flow__li:first-child.weui-wepay-flow__li_done .weui-wepay-flow__state {
      background: url('../../../static/images/fy-step1-on.png') no-repeat;
      background-size: contain;
    }
    .weui-wepay-flow__li:nth-child(3).weui-wepay-flow__li_done .weui-wepay-flow__state {
      background: url('../../../static/images/fy-step2-on.png') no-repeat;
      background-size: contain;
    }
    .weui-wepay-flow__li:last-child.weui-wepay-flow__li_done .weui-wepay-flow__state {
      background: url('../../../static/images/fy-step3-on.png') no-repeat;
      background-size: contain;
    }
    .weui-wepay-flow__title-bottom {
      top: 47px;
    }
    .weui-wepay-flow__process, [class^="weui-wepay-flow__info-"] {
      background: #ff6253;
    }
    .weui-wepay-flow__info-top:after {
      border-color: #ff6253;
    }
  }
</style>
