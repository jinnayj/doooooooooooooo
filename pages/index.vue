<template>
  <div class="card login">
    <h2>เข้าสู่ระบบ</h2>

    <input v-model="email" placeholder="อีเมล" />
    <input v-model="password" type="password" placeholder="รหัสผ่าน" />

    <button class="btn btn-orange" @click="login">
      เข้าสู่ระบบ
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return { email:'', password:'' }
  },
  methods: {
    async login() {
      const res = await this.$axios.$post('auth/login.php', {
        email: this.email,
        password: this.password
      })
      if (res.success) this.$router.push('/reserve/table')
      else alert('ข้อมูลไม่ถูกต้อง')
    }
  }
}
</script>

<style scoped>
.login {
  max-width: 380px;
  margin: 80px auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
}
</style>
