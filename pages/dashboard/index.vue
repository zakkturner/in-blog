<template>
  <Title>Dashboard | {{title}}</Title>
  <base-layout>


    <div class="row">
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-header">
            <h3>Dashboard</h3>
          </div>
          <div class="card-body">
            <p class="mb-0" >You are logged in as <b>{{user?.name}}</b></p>
            <p class="mb-0" >Your email: <b>{{user?.email}}</b></p>
          </div>
        <div class="">
          <h3>My Posts</h3>
          <ul v-if="posts"><li v-for="post in posts" :key="post.id"><NuxtLink :to="`/posts/${post.id}`">{{post.title}}</NuxtLink></li></ul>
        </div>
        </div>
      </div>
    </div>
  </base-layout>
</template>

<script>

import BaseLayout from "../../src/components/layouts/BaseLayout";
import {useCookie, useRuntimeConfig, useState} from "nuxt/app";
import axios from "axios";
import {onMounted, ref} from "vue";

export default {
  name: "index",
  components: {BaseLayout},
  setup(){
    const title = useState('title');
    const user = ref(null);
    const posts = ref([])
    onMounted(async () =>{
      const response = await axios.get(`${useRuntimeConfig().public.BASE_URL}/api/user`,{
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
        }});
      user.value = response.data;
      const responsePosts = await axios.get(`${useRuntimeConfig().public.BASE_URL}/api/user/posts`,{
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
        }});
      posts.value = responsePosts.data;

    })

    return {title, user, posts}
  }


}
</script>

<style scoped>

</style>