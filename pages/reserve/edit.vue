<template>
  <div class="page">
    <div class="card">
      <h2>✏️ แก้ไขการจอง</h2>

      <div v-if="loading">กำลังโหลดข้อมูล...</div>

      <div v-else>
        <div class="field">
          <label>โต๊ะ</label>
          <input type="number" v-model="form.table_id" />
        </div>

        <div class="field">
          <label>ชื่อ</label>
          <input v-model="form.name" />
        </div>

        <div class="field">
          <label>เบอร์โทร</label>
          <input v-model="form.phone" />
        </div>

        <div class="field">
          <label>วันที่</label>
          <input type="date" v-model="form.reserve_date" />
        </div>

        <div class="field">
          <label>เวลา</label>
          <input type="time" v-model="form.reserve_time" />
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <button @click="save">บันทึกการแก้ไข</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      error: '',
      form: {
        table_id: '',
        name: '',
        phone: '',
        reserve_date: '',
        reserve_time: ''
      }
    }
  },

  computed: {
    id() {
      return this.$route.query.id
    }
  },

  async mounted() {
    if (!this.id) {
      this.$router.push('/reserve/my-bookings')
      return
    }

    try {
      const res = await this.$axios.$get(
        `http://localhost:8081/backend-1/reservations/get.php?id=${this.id}`
      )

      if (!res.success) {
        this.error = res.message
        return
      }

      this.form = res.data
    } catch (e) {
      this.error = 'เชื่อมต่อ backend ไม่ได้'
    } finally {
      this.loading = false
    }
  },

  methods: {
    async save() {
      this.error = ''

      if (
        !this.form.table_id ||
        !this.form.name ||
        !this.form.phone ||
        !this.form.reserve_date ||
        !this.form.reserve_time
      ) {
        this.error = 'กรุณากรอกข้อมูลให้ครบ'
        return
      }

      try {
        const res = await this.$axios.$post(
          'http://localhost:8081/backend-1/reservations/update.php',
          {
            id: Number(this.id),
            ...this.form,
            reserve_time:
              this.form.reserve_time.length === 5
                ? this.form.reserve_time + ':00'
                : this.form.reserve_time
          }
        )

        if (res.success) {
          alert('✅ แก้ไขสำเร็จ')
          this.$router.push('/reserve/my-bookings')
        } else {
          this.error = res.message
        }
      } catch (e) {
        this.error = 'บันทึกไม่สำเร็จ'
      }
    }
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg,#ffe0c2,#ffd0a6);
}
.card {
  width: 420px;
  background: #fff;
  padding: 24px;
  border-radius: 18px;
}
.field {
  margin-bottom: 10px;
}
input {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
}
button {
  margin-top: 12px;
  width: 100%;
  padding: 12px;
  background: #ff7a00;
  color: #fff;
  border: none;
  border-radius: 12px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
