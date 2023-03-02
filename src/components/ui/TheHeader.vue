<template>
  <nav class="navbar bg-red-300">

    <ul class="nav-list">
      <li class="nav-item">
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
      </li>
      <li class="nav-item" v-if="isLoggedIn">
        <NuxtLink to="/posts/create" class="nav-link" >Create</NuxtLink>
      </li>
      <li class="nav-item" v-if="isLoggedIn">
        <NuxtLink to="/dashboard" class="nav-link" >Dashboard</NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink to="/about" class="nav-link">About</NuxtLink>

      </li>
      <li class="nav-item" v-if="!isLoggedIn">
        <NuxtLink to="/auth/register" class="nav-link">Register</NuxtLink>
      </li>
      <li class="nav-item" v-if="!isLoggedIn">
        <NuxtLink to="/auth/login" class="nav-link" >Login</NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink to="/auth/login" class="nav-link">Contact</NuxtLink>
      </li>
      <li class="nav-item" v-if="isLoggedIn">
        <a href="#" class="nav-link" @click.prevent="logout" >Logout</a>
      </li>
      <li class="nav-item" v-if="isLoggedIn">
        <span>Hello, <NuxtLink to="/dashboard">{{ getUser()?.name }}</NuxtLink></span>
      </li>
    </ul>
  </nav>
</template>

<script>
import axios from "axios";
import {useCookie, useRuntimeConfig} from "nuxt/app";
import {useAuth} from "../../../composables/useAuth";
const { removeUser, isLoggedIn, getUser } = useAuth();
export default {
  name: "TheHeader",
  setup(){

    async function logout(){
      try{

        await axios.post(`${useRuntimeConfig().public.BASE_URL}/logout`, {},
            {
          withCredentials: true,
          headers: {
            Accept: 'application/json',
            'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
          }}
        )



      }catch(e){
        console.log(e.response.data);
      }
      finally {
        removeUser()
        window.location.pathname = '/'
      }
    }

    return {logout, isLoggedIn, getUser}
  }
}
</script>

<style scoped>
.navbar{
  width: 100%;
  padding: 20px 0;
  background: #c9c9c9;
}
.nav-list{
  width: 60%;
  margin: 0 auto;
  display: flex;

}
.nav-item{
  list-style-type: none;
  text-align: center;
  margin-right: 20px;
}
.nav-link{
  text-decoration: none;
  font-family: Arial;
  font-weight: bold;
  color: white;
}
.router-link-active{
  font-weight: bold;
  text-decoration: underline;
  color: green;
}
</style>