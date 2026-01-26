<template>
  <div class="page">
    <div class="card login">

      <!-- Header -->
      <div class="header">
        <div class="logo">🍽️</div>
        <h2>{{ isRegister ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ' }}</h2>
        <p class="subtitle">
          {{ isRegister ? 'สร้างบัญชีเพื่อใช้งานระบบ' : 'จัดการการจองโต๊ะง่าย ๆ' }}
        </p>
      </div>

      <!-- Form -->
      <div class="form">

        <div v-if="isRegister" class="field">
          <label>ชื่อ</label>
          <input v-model="name" placeholder="ชื่อผู้ใช้งาน" />
        </div>

        <div class="field">
          <label>อีเมล</label>
          <input v-model="email" placeholder="you@email.com" />
        </div>

        <div class="field">
          <label>รหัสผ่าน</label>
          <input type="password" v-model="password" placeholder="••••••••" />
        </div>

        <div v-if="isRegister" class="field">
          <label>ยืนยันรหัสผ่าน</label>
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="••••••••"
          />
        </div>

        <button class="btn" :disabled="loading" @click="submit">
          {{ loading ? 'กำลังทำงาน...' : (isRegister ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ') }}
        </button>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p v-if="!isRegister">
          ยังไม่มีบัญชี?
          <span @click="isRegister = true">สมัครสมาชิก</span>
        </p>
        <p v-else>
          มีบัญชีแล้ว?
          <span @click="isRegister = false">เข้าสู่ระบบ</span>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRegister: false,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      loading: false
    }
  },
  methods: {
    async submit() {
      if (!this.email || !this.password || (this.isRegister && !this.name)) {
        alert('กรุณากรอกข้อมูลให้ครบ')
        return
      }

      if (this.isRegister && this.password !== this.confirmPassword) {
        alert('รหัสผ่านไม่ตรงกัน')
        return
      }

      this.loading = true
      try {
        const url = this.isRegister
          ? 'auth/register.php'
          : 'auth/login.php'

        const payload = this.isRegister
          ? { name: this.name, email: this.email, password: this.password }
          : { email: this.email, password: this.password }

        const res = await this.$axios.$post(url, payload)

        if (res.success) {
          if (this.isRegister) {
            alert('สมัครสำเร็จ 🎉')
            this.$router.push('/')
          } else {
            alert('เข้าสู่ระบบสำเร็จ')
            this.$router.push('/reserve/table')
          }
        } else {
          alert(res.message || 'เกิดข้อผิดพลาด')
        }

      } catch (e) {
        alert('เชื่อมต่อระบบไม่ได้')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
/* พื้นหลัง */
.page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top, #fff7ed, transparent 60%),
    linear-gradient(135deg, #ffe7cf, #ffd2a8);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Card */
.card {
  background: #fff;
  padding: 32px 28px;
  border-radius: 22px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  width: 100%;
  max-width: 400px;
  animation: fadeUp 0.5s ease;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 24px;
}

.logo {
  font-size: 42px;
}

h2 {
  margin: 10px 0 0;
  color: #d35400;
}

.subtitle {
  font-size: 14px;
  color: #777;
}

/* Form */
.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.field label {
  font-size: 13px;
  color: #555;
}

input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 15px;
}

input:focus {
  border-color: #ff8c1a;
  outline: none;
  box-shadow: 0 0 0 2px rgba(255,140,26,0.15);
}

/* Button */
.btn {
  margin-top: 10px;
  padding: 14px;
  border-radius: 14px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  background: linear-gradient(135deg, #ff7a00, #ff9a3c);
  color: #fff;
  transition: 0.25s;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255,122,0,0.4);
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Footer */
.footer {
  margin-top: 18px;
  text-align: center;
  font-size: 13px;
}

.footer span {
  color: #ff7a00;
  cursor: pointer;
  font-weight: 500;
}

/* Animation */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
