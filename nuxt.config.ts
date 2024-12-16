// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  
  runtimeConfig: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  devServer: { port: 8000 },
  css: ['~/assets/css/main.css'],
  modules: [// defaults to "/login" page if enabled: https://www.reddit.com/r/Nuxt/comments/17a3p7r/nuxt_app_keeps_redirecting_to_login/
  // 'nuxt-security',
  '@nuxtjs/supabase', '@pinia/nuxt'],
  // security: {
  //   corsHandler: {
      
  //   }
  // },
  supabase: {
    redirect: false,  // remedies default behaviour of redirecting to login
  }
})