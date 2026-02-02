<template>
  <div class="page">
    <div class="card">
      <h2>📝 ข้อมูลการจอง</h2>

      <input v-model="name" placeholder="ชื่อผู้จอง" />
      <input v-model="phone" placeholder="เบอร์โทร" />
      <input type="date" v-model="date" />
      <input type="time" v-model="time" />

      <p class="deposit">💰 มัดจำ 500 บาท</p>

      <p v-if="error" class="error">{{ error }}</p>

      <button @click="reserve">ถัดไป → ชำระเงิน</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      phone: '',
      date: '',
      time: '',
      error: ''
    }
  },
  methods: {
    async reserve() {
      try {
        const res = await this.$axios.$post(
          'http://localhost:8081/backend-1/reservations/create.php',
          {
            table_id: Number(this.$route.query.table),
            name: this.name,
            phone: this.phone,
            reserve_date: this.date,
            reserve_time: this.time.length === 5
              ? this.time + ':00'
              : this.time,
            deposit: 500
          }
        )

        if (res.success) {
          this.$router.push('/reserve/payment?id=' + res.booking_id)
        } else {
          this.error = res.message
        }

      } catch (e) {
        console.error(e)
        this.error = 'เชื่อมต่อ backend ไม่ได้'
      }
    }
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(135deg,#ffe0c2,#ffd0a6);
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  width: 360px;
  background: white;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,.15);
}
input {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid #eee;
}
button {
  margin-top: 16px;
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg,#ff7a00,#ff9a3c);
  border: none;
  color: white;
  border-radius: 14px;
}
.deposit {
  margin-top: 12px;
  text-align: center;
  color: #d35400;
}
.error {
  color: red;
  text-align: center;
}
</style>
