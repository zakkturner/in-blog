<template>
  <base-layout>

    <h3>Register</h3>
    <h5 class="error" v-show="errors.length > 0 " v-for="error in errors">{{error}} </h5>
    <form @submit.prevent="register">
      <label for="name">Name</label>
      <input type="text" id="name" v-model="name">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password">
      <label for="confirm_password">Confirm Password</label>
      <input type="password" id="confirm_password" v-model="confirm_password">
      <button type="submit">Sign Up</button>
      <span>Have an account? <NuxtLink to="./login">Login</NuxtLink></span>
    </form>
  </base-layout>
</template>

<script>
import BaseLayout from "../../src/components/layouts/BaseLayout";
import axios from "axios";
import {useCookie, useRuntimeConfig} from "nuxt/app";
export default {
  name: "register",
  components: {BaseLayout},
  setup(){
   const name = ref('');
   const email = ref('');
   const password = ref('');
   const confirm_password = ref('');
  const errors = ref([]);
 const isLoading = ref(false);
    function csrf(){
      return  axios.get(`${useRuntimeConfig().public.BASE_URL}/sanctum/csrf-cookie`, {withCredentials: true});
    }
    async function register(){
      await csrf();

      try{
        isLoading.value = true
        console.log(email.value, password.value)
        console.log(password.value, confirm_password.value)
        await axios.post(`${useRuntimeConfig().public.BASE_URL}/register`,{
          name: name.value,
          email: email.value,
          password: password.value,
          password_confirmation: confirm_password.value

        }, {
          withCredentials: true,
          headers: {
            Accept: 'application/json',
            'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
          }})
        console.log(password.value, confirm_password.value)
        window.location.pathname = '/dashboard/'
        isLoading.value = false
      }catch(e){
        console.log(e.response.data);
        errors.value = Object.values(e.response.data.errors).flat();
        isLoading.value = false
      }

    }

   return {name, email, password, confirm_password, register, errors}

  }
}
</script>

<style scoped>

</style>