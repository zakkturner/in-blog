<template>
<base-layout>
  <div>
    <div class="errors" v-if="errors.length > 0">Error: {{errors}} </div>
    <form action="#" @submit.prevent="createPost">
      <div class="form-container">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" name="title" v-model="title">
        </div>
        <div class="form-group">
        <label for="body">Body</label>
        <textarea cols="45" rows="20" name="body" v-model="body"></textarea>
          </div>
      </div>
  <button type="submit">Create Post</button>
    </form>
    <span v-show="isLoading">Loading...</span>
  </div>
</base-layout>

</template>

<script>
definePageMeta({
  middleware: ['auth']
})
import BaseLayout from "../../src/components/layouts/BaseLayout";
import {ref} from "vue";
import axios from "axios";

import {useCookie, useRuntimeConfig} from "nuxt/app";
export default {
  name: "create",
  components: {BaseLayout},
  setup(){
    const title = ref('');
    const body = ref('');
    const isLoading = ref(false);
    const router = useRouter();
    let errors = ref([]);
    async function createPost(){
      isLoading.value = true
try{
  const post = await axios.post(
      `${useRuntimeConfig().public.BASE_URL}/api/post`,{
        title: title.value,
        body: body.value
      },
      { withCredentials: true,
        headers: {
          Accept: 'application/json',
          'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
        }}
  ).then((response)=> {
    isLoading.value = false
    console.log(response)
    title.value = ''
    body.value = ''
  })
}catch(error){

  errors.value = error.message

  console.log(error)
  isLoading.value = false
}


      alert("Creating Post")
router.push('/')
    }
    return {title, body,isLoading, errors, createPost}
  }
}
</script>

<style scoped>
.errors{
  color: red;
}
.form-group{
  margin-bottom: 45px;
  display: flex;
  flex-direction: column;
}
</style>