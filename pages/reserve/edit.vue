<template>
  <div class="page">
    <h2>✏️ แก้ไขการจอง</h2>

    <div v-if="loading">
      กำลังโหลดข้อมูล...
    </div>

    <div v-else class="card">
      <p class="rid">รหัสการจอง: {{ rid }}</p>

      <label>โต๊ะ</label>
      <input type="number" v-model="form.table_id" />

      <label>ชื่อผู้จอง</label>
      <input v-model="form.name" />

      <label>เบอร์โทร</label>
      <input v-model="form.phone" />

      <label>วันที่</label>
      <input type="date" v-model="form.reserve_date" />

      <label>เวลา</label>
      <input type="time" v-model="form.reserve_time" />

      <button @click="save">
        บันทึกการแก้ไข
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rid: this.$route.query.rid,
      loading: true,
      form: {
        table_id: '',
        name: '',
        phone: '',
        reserve_date: '',
        reserve_time: ''
      }
    }
  },

  async mounted() {
    if (!this.rid) {
      alert('ไม่พบรหัสการจอง')
      this.$router.push('/reserve/my-bookings')
      return
    }

    try {
      const res = await this.$axios.$get(
        `/backend/reserve/get.php?rid=${this.rid}`
      )

      if (!res.success) {
        alert(res.message)
        this.$router.push('/reserve/my-bookings')
        return
      }

      this.form = {
        table_id: res.data.table_id,
        name: res.data.name,
        phone: res.data.phone,
        reserve_date: res.data.reserve_date,
        reserve_time: res.data.reserve_time.substring(0,5)
      }

    } catch (e) {
      console.error(e)
      alert('เชื่อมต่อ backend ไม่ได้')
      this.$router.push('/reserve/my-bookings')
    } finally {
      this.loading = false
    }
  },

  methods: {
    async save() {
      if (
        !this.form.table_id ||
        !this.form.name ||
        !this.form.phone ||
        !this.form.reserve_date ||
        !this.form.reserve_time
      ) {
        alert('กรุณากรอกข้อมูลให้ครบ')
        return
      }

      const payload = {
        id: Number(this.rid),
        table_id: Number(this.form.table_id),
        name: this.form.name.trim(),
        phone: this.form.phone.trim(),
        reserve_date: this.form.reserve_date,
        reserve_time: this.form.reserve_time + ':00'
      }

      try {
        const res = await this.$axios.$post(
          '/backend/reserve/update.php',
          payload
        )

        if (res.success) {
          alert('บันทึกเรียบร้อย')
          this.$router.push('/reserve/my-bookings')
        } else {
          alert(res.message || 'บันทึกไม่สำเร็จ')
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
.page {
  max-width: 500px;
  margin: auto;
}
.card {
  background: #fff;
  padding: 20px;
  border-radius: 14px;
  box-shadow: 0 4px 10px rgba(0,0,0,.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
}
button {
  margin-top: 10px;
  padding: 12px;
  background: #ff7a00;
  color: white;
  border: none;
  border-radius: 10px;
}
.rid {
  font-size: 13px;
  color: #999;
}
</style>
