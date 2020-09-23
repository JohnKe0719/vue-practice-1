<template>
  <div class="v-for">
    <h1>各種水果</h1>
    <br>
    <h3 v-for="fruit in fruits" :key="fruit.name">
       水果名: {{ fruit.name }} 價格: {{ fruit.price }} 元
       <br>
    </h3>
  </div>
</template>

<script>

export default {
  data () {
    return {
      fruits: [
        {
          name: '香蕉',
          price: 100
        },
        {
          name: '蘋果',
          price: 50
        },
        {
          name: '芭樂',
          price: 150
        },
        {
          name: '蓮霧',
          price: 200
        },
        {
          name: '水蜜桃',
          price: 180
        }
      ]
    }
  }
}
</script>
