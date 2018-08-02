<template>
<!-- App.vue是我们的主组件，所有的页面都是在App.vue下进行切换的；也可以认为所有的路由也是App.vue的子组件 -->
  <div id="app">
  <!-- <div class="app">   -->
    <img src="./assets/userHead.png" class="headImg">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.headImg{
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
}
</style>
