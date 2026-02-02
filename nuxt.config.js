export default {
  ssr: false,

  head: {
    title: 'ระบบจองร้านอาหาร',
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Anuphan:wght@300;400;500;600;700&display=swap'
      }
    ]
  },

  modules: ['@nuxtjs/axios'],

  axios: {
    baseURL: 'http://localhost:8081/backend-1'
  },

  css: [
    '@/assets/css/main.css'
  ]
}
