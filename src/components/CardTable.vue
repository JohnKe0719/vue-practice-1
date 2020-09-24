<template>
    <Row>
      <Col v-for="card in cards" :key="card" span="4">
        <Button type="default" size="large" :style="'color:'+color" @click="callback(card)" >{{ card }}</Button>
      </Col>
    </Row>
</template>

<script>

export default {
  props: {
    color: {
      type: String,
      default: 'black'
    },
    cards: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
    }
  },
  methods: {
    callback (data) {
      this.$emit('click', data)
    }
  }
}
</script>
