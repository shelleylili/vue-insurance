<template>
  <div class="step2">
    <!--下一步 -->
    <Button :clickHandler="next" :text="text"></Button>
  </div>
</template>

<script>
  import Button from '../../chunks/Button'
  import bus from '../../../bus'

  export default {
    name: 'Step2',
    data () {
      return {
        text: '下一步' // 下一步按钮文字
      }
    },
    methods: {
      next: function () {
        this.$router.push('/step3')
        bus.$emit('fastpy3', '启动理赔')
      }
    },
    components: {
      Button
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss">

</style>
