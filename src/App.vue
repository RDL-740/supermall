<template>
  <div id="app">
  	<router-view></router-view>
 	<MainTabar></MainTabar>
  </div>
</template>

<script>
import MainTabar from 'components/content/maintabar/MainTabar'
export default {
  name: 'App',
  components: {
   	MainTabar
  }
}
</script>

<style>
  @import "./assets/css/base.css";
</style>
