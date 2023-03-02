import {defineNuxtRouteMiddleware} from "nuxt/app";

export default defineNuxtRouteMiddleware((to, from) => {
    const {isLoggedIn} = useAuth();
    if(process.client) {
        if (isLoggedIn.value) {
            window.location.pathname = "/dashboard"
        }
    }
})