<template>
  <div class="post-header ">
    <NuxtLink :to="`/posts/${post.id}`" class="post-title">{{ post.title }}</NuxtLink>
    <small class="text-green-600">By: {{post.user.name}} on {{format(new Date(post.created_at), "MMMM dd, yyyy")}}</small>
  </div>
  <p class="post-body">{{post.body.substring(0,80)}}</p>


  <div>
    <NuxtLink :to="`/posts/${post.id}`" class="mt-5 text-blue-400">Read More</NuxtLink>
  </div>
  <hr/>
</template>

<script setup>

import {format} from 'date-fns';
    const props = defineProps({
      post: Object
    })




</script>

<style scoped>
.post-header{
  display: flex;
  flex-direction: column;
}

.post-title{
  text-decoration: none;
  margin-bottom: 50px;
}
.post-body{
  margin: 50px 0;
}
</style>