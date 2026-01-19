<template>
  <div class="card">
    <h3>กรอกข้อมูลการจอง</h3>

    <p class="table">🍽 โต๊ะที่ {{ table }}</p>

    <input v-model="name" placeholder="ชื่อผู้จอง" />
    <input v-model="phone" placeholder="เบอร์โทร" />
    <input type="date" v-model="date" />
    <input type="time" v-model="time" />

    <button @click="submit">
      ยืนยันการจอง
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      table: this.$route.query.table,
      name: '',
      phone: '',
      date: this.$route.query.date || '',
      time: this.$route.query.time || ''
    }
  },

  methods: {
    async submit() {
      if (!this.name || !this.phone || !this.date || !this.time) {
        alert('กรุณากรอกข้อมูลให้ครบ')
        return
      }

      try {
        const res = await this.$axios.$post(
          'reservations/create.php',
          {
            table_id: this.table,
            name: this.name,       // ✅ สำคัญ
            phone: this.phone,     // ✅ สำคัญ
            reserve_date: this.date,
            reserve_time: this.time
          }
        )

        console.log('CREATE RES:', res)

        if (res.success) {
          this.$router.push(
            `/reserve/payment?rid=${res.reservation_id}`
          )
        } else {
          alert(res.message)
        }

      } catch (e) {
        console.error(e)
        alert('เชื่อมต่อ backend ไม่ได้')
      }
    }
  }
}
</script>

<style scoped>
.card {
  max-width: 420px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0,0,0,.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

button {
  padding: 12px;
  background: #ff7a00;
  color: white;
  border: none;
  border-radius: 8px;
}

.table {
  font-weight: bold;
  color: #ff7a00;
}
</style>
