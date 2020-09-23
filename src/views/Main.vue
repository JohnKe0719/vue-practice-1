<template>
    <div id="main">
        <Menu mode="horizontal" active-name="Home">
            <MenuItem v-for="item in menu" :key="item.name" :name="item.name" :to="item.path">
              {{ item.name }}
            </MenuItem>
        </Menu>
        <br>
        <router-view/>
    </div>
</template>

<script>
import { routerMenu } from '../router'

export default {
  data () {
    return {
      menu: routerMenu
    }
  }
}
</script>

<style lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
