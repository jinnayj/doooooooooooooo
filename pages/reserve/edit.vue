<template>
  <div class="page">
    <div class="card">
      <h2>✏️ แก้ไขการจอง</h2>

      <div v-if="loading" class="loading">
        ⏳ กำลังโหลดข้อมูล...
      </div>

      <div v-else class="form">
        <div class="field">
          <label>ชื่อผู้จอง</label>
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

        <button @click="save">
          💾 บันทึกการแก้ไข
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      rid: null,
      form: {
        name: '',
        phone: '',
        reserve_date: '',
        reserve_time: ''
      }
    }
  },

  async mounted() {
    this.rid = this.$route.query.rid

    try {
      const res = await this.$axios.get(
        `http://localhost:8081/backend/reservations/get.php?id=${this.rid}`
      )

      if (res.data) {
        this.form = res.data
      }

    } catch (e) {
      console.error(e)
      alert('เชื่อมต่อ backend ไม่ได้')
    } finally {
      this.loading = false
    }
  },

  methods: {
    async save() {
      try {
        await this.$axios.post(
          'http://localhost:8081/backend/reservations/update.php',
          {
            id: this.rid,
            ...this.form
          }
        )

        alert('บันทึกเรียบร้อยแล้ว ✅')
        this.$router.push('/reserve/my-bookings')

      } catch (e) {
        console.error(e)
        alert('บันทึกไม่สำเร็จ')
      }
    }
  }
}
</script>

<style scoped>
/* พื้นหลังเต็มจอ */
.page {
  min-height: 100vh;
  width: 100vw;
  background:
    radial-gradient(circle at top, #fff7ed, transparent 60%),
    linear-gradient(135deg, #ffe7cf, #ffd2a8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

/* Card */
.card {
  width: 100%;
  max-width: 420px;
  background: #fff;
  padding: 28px;
  border-radius: 20px;
  box-shadow: 0 18px 36px rgba(0,0,0,.15);
  animation: fadeUp 0.5s ease;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #d35400;
}

/* Loading */
.loading {
  text-align: center;
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
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 15px;
  outline: none;
  transition: 0.2s;
}

input:focus {
  border-color: #ff8c1a;
  box-shadow: 0 0 0 2px rgba(255,140,26,.15);
}

/* Button */
button {
  margin-top: 10px;
  padding: 14px;
  border-radius: 14px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  background: linear-gradient(135deg, #28a745, #4fd16b);
  color: #fff;
  transition: 0.25s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(40,167,69,.45);
}

/* Animation */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
