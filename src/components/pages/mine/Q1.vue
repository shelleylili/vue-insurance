<template>
  <div class="q1">
    <Question :questions="questions"></Question>
  </div>
</template>

<script>
import Question from '../../chunks/Question'
import { getQuestionsByCaId } from '../../../api'
export default {
  name: 'q1',
  data () {
    return {
      id: this.$route.params.id,
      questions: []
    }
  },
  created () {
    getQuestionsByCaId(this, 'questions', this.id)
  },
  components: {
    Question
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
