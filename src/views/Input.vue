<template>
  <div class="v-model">
    <h3>猜一個數字（1~100）</h3>
    <br>
    {{ displayMessage }}
    <br><br>
    <Row>
      <Col span="8" offset="8">
        <Input v-model="value1" number clearable maxlength="2"  @on-change="checkAnswer(value1)" @dblclick.native="showAnswer()">
        </Input>
      </Col>
    </Row>
  </div>
</template>

<script>

export default {
  data () {
    return {
      value1: '',
      displayMessage: '',
      answer: 58
    }
  },
  created () {
    this.answer = this.getRandomInt(100)
  },
  methods: {
    checkAnswer (inputNumber) {
      this.displayMessage = inputNumber === this.answer ? '恭喜你猜對了！' : inputNumber > this.answer ? '再小一點' : '再大一點'
    },
    showAnswer () {
      alert(`答案是：${this.answer}`)
    },
    getRandomInt (maxNumber) {
      return Math.floor(Math.random() * Math.floor(maxNumber))
    }
  }
}
</script>
