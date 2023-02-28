<template>
  <the-header></the-header>
  <div class="container">
  <h1 class="page-title text-4xl ">{{pageTitle}}</h1>
  <slot />
</div>
</template>

<script>

import TheHeader from "../ui/TheHeader";
export default {
  name: "BaseLayout",
  components: {TheHeader},
  props: ['pageTitle']
}
</script>

<style scoped>
.container{
  width: 60%;
  margin: 0 auto;
}
.page-title{
  margin: 25px 0 50px 0;
  font-family: Arial;
  text-transform: uppercase;
}
</style>