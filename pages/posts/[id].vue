<template>
<!--  <div v-if="error">-->
<!--    {{ error }}-->
<!--  </div>-->
  <base-layout>
    <div v-if="post">
      <div class="post-header">
      <h1 class="post-title">{{ post.title }}</h1>
        <h2>{{format(new Date(post.created_at), "MMMM dd, yyyy")}} | {{post.user.name}}</h2>
      </div>
      <p>{{ post.body }}</p>
    </div>
    <p v-else>Loading...</p>

  </base-layout>
</template>

<script>
import axios from "axios";
import { onMounted,  ref } from "vue";
import {useRoute, useRuntimeConfig} from "nuxt/app";
import BaseLayout from "../../src/components/layouts/BaseLayout";
import {format} from 'date-fns';
export default {
  name: "[post]",
  components: {BaseLayout},
  setup() {
    const route = useRoute();
    const id = route.params.id;
    const post = ref(null);
    const loading = ref(false);
    const error = ref(null);

    onMounted(async () => {
      loading.value = true;
      console.log(id)
      try {

        const response = await axios.get(
            `${useRuntimeConfig().public.BASE_URL}/api/posts/${id}`
        );
        post.value = response.data;
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    });

    return {post, loading, error, format };
  },
};
</script>

<style scoped>
.post-title{
  font-size: 48px;
}
</style>
