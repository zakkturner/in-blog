<template>
  <base-layout>

    <h3>Login</h3>
    <h5 class="error" v-show="errors.length > 0 " v-for="error in errors">{{error}} </h5>
    <form @submit.prevent="login">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" v-model="email">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" v-model="password">
      <button type="submit">Log In</button>
      <span>Don't have an account? <NuxtLink to="./register">Register</NuxtLink></span>
    </form>
  </base-layout>
</template>

<script setup >

import BaseLayout from "../../src/components/layouts/BaseLayout";
import {ref} from "vue";
import axios from "axios";
import {useCookie, useRuntimeConfig} from "nuxt/app";
const email = ref('');
const password = ref('');
const isLoading = ref(false);
let errors = ref([]);

function csrf(){
  return  axios.get(`${useRuntimeConfig().public.BASE_URL}/sanctum/csrf-cookie`, {withCredentials: true});
}
async function login(){
  await csrf();

try{
  isLoading.value = true
  console.log(email.value, password.value)
  await axios.post(`${useRuntimeConfig().public.BASE_URL}/login`,{
    email: email.value,
    password: password.value,

  }, {
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
    }})
  console.log('logged in')
  window.location.pathname = '/dashboard/'
  isLoading.value = false
}catch(e){
  console.log(e.response.data);
  errors.value = Object.values(e.response.data.errors).flat();
  isLoading.value = false
}

}
</script>

<style scoped>
.error{
  color: red;
}
</style>