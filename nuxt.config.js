export default {
  ssr: false,
  modules: ['@nuxtjs/axios'],
  axios: {
    baseURL: 'http://localhost:8081/backend/'
  }
}
