<template>
  <div class="v-model">
    <div v-if="isClick">
      You click the button!
    </div>
    <div v-else>
      Hello User!
    </div>
    <button @click="chageClickState(isClick)">
      <h5 v-if="isClick"> Go Back</h5>
      <h5 v-else>Click Me</h5>
    </button>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isClick: false
    }
  },
  methods: {
    chageClickState (state) {
      this.isClick = !state
    }
  }
}
</script>
