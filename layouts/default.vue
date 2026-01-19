<template>
  <div>
    <Navbar />
    <div class="container">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
export default { components: { Navbar } }
</script>
