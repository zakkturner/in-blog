// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig:{
  public:{
    BASE_URL: 'http://localhost:8000'
  }
  },
  imports: {
    dirs: ["stores"],
  },
  modules: [ "@pinia/nuxt", ],
  vite: {
    optimizeDeps: {
      exclude: ['class-validator']
    }
  }
});
