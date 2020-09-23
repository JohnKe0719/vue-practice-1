<template>
  <div class="v-model">
    {{ testMessage }}
    <br>
    <input v-model="testMessage"/>
  </div>
</template>

<script>

export default {
  data () {
    return {
      testMessage: 'this is test'
    }
  }
}
</script>
