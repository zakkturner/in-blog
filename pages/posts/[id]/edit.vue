<template>
  <base-layout>
    <div>
      <div class="errors" v-if="errors.length > 0">Error: {{errors}} </div>
      <h2>Edit Post</h2>
      <form action="#" @submit.prevent="updatePost">
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
        <button type="submit">Update Post</button>

      </form>
      <div class="delete-container">
        <button class="delete-button" @click="deletePost">Delete Post</button>
      </div>
      <span v-show="isLoading">Loading...</span>
    </div>
  </base-layout>
</template>

<script>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useCookie, useRoute, useRouter, useRuntimeConfig} from "nuxt/app";
import BaseLayout from "../../../src/components/layouts/BaseLayout";

export default {
  name: "edit",
  components: {BaseLayout},
  setup(){
    const title = ref('');
    const body = ref('');
    const isLoading = ref(false);
    const router = useRouter();
  const route = useRoute();
    const post = ref(null)
    let errors = ref([]);
    const id = route.params.id;

    onMounted(async ()=>{
   try{
     console.log(`${useRuntimeConfig().public.BASE_URL}/api/postsAuth/${id}`)
     post.value = await axios.get(
         `${useRuntimeConfig().public.BASE_URL}/api/postsAuth/${id}`,{ withCredentials: true,
           headers: {
             Accept: 'application/json',
             'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
           }}
     )

     title.value = post.value.data.title;
     body.value = post.value.data.body;
   }
      catch (e) {
        console.log(e)

        window.location.pathname = '/'
      }
    })
    async function updatePost(){
      isLoading.value = true
      try{


        const post = await axios.patch(
            `${useRuntimeConfig().public.BASE_URL}/api/post/${id}`,{
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
          console.log('Updated Post')
          router.push('/dashboard')

        })
      }catch(error){

        errors.value = error.response.data.message
        if(error.response.status === 403){
            console.log(error.response.data.message);

            return
        }

        isLoading.value = false
      }



    }
    async function deletePost(){
      isLoading.value = true
      try{


        const post = await axios.delete(
            `${useRuntimeConfig().public.BASE_URL}/api/post/${id}`,
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
          console.log('Deleted Post')
          router.push('/dashboard')

        })
      }catch(error){
        errors.value = error.response.data.message
        if(error.response.status === 403){
          console.log(error.response.data.message);

          return
        }

        console.log(error)
        isLoading.value = false
      }



    }
    return {title, body,isLoading, errors, updatePost,deletePost}
  }
}
</script>

<style scoped>

</style>