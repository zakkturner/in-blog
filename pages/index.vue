<template>
  <Title>{{ title }}</Title>
<base-layout :pageTitle="title">

  <ul class="post-list">
    <li class="post-item" v-for="post in blogPosts" :key="post.id">
  <post-item :post="post"></post-item>
    </li>
  </ul>
</base-layout>
</template>

<script>
import {useBlogStore} from "../stores/BlogPostStore";
import {ref, onMounted} from 'vue';
import {computed } from 'vue';
import BaseLayout from "../src/components/layouts/BaseLayout";
import {useFetch, useState} from "nuxt/app";
import PostItem from "../src/components/posts/PostItem";

export default {
  name: "index",
  components: {PostItem, BaseLayout},
  setup(){
    const title = useState("title", ()=> "Interactive Nerd Blog")
    const blogStore = useBlogStore();
    blogStore.fetchBlogPosts();
    const blogPosts = computed(()=>blogStore.getBlogPosts)
    console.log("Posts:", blogPosts.value)

    return {blogPosts, title}
  }
}
</script>

<style scoped>
.post-list{

  height: 100%;
  margin: 20px auto;

}
.post-item{
  margin: 20px 0;
  list-style-type: none;
}
</style>