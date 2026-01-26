<template>
  <div class="page">
    <div class="wrapper">
      <h2>📋 รายการจองของฉัน</h2>

      <div v-if="bookings.length === 0" class="empty">
        😔 ยังไม่มีรายการจอง
      </div>

      <div
        v-for="r in bookings"
        :key="r.id"
        class="card"
      >
        <div class="top">
          <span class="table">🍽 โต๊ะ {{ r.table_id }}</span>
          <span class="status" :class="r.status">
            {{ r.status }}
          </span>
        </div>

        <p>👤 {{ r.name }}</p>
        <p>📞 {{ r.phone }}</p>
        <p>📅 {{ r.reserve_date }} ⏰ {{ r.reserve_time }}</p>

        <button @click="goEdit(r.id)">
          ✏️ แก้ไขการจอง
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookings: []
    }
  },

  async mounted() {
    try {
      const res = await this.$axios.get(
        'http://localhost:8081/backend/reservations/my_bookings.php'
      )

      this.bookings = Array.isArray(res.data) ? res.data : []

    } catch (e) {
      console.error('โหลดรายการจองไม่สำเร็จ', e)
      alert('เชื่อมต่อ backend ไม่ได้')
      this.bookings = []
    }
  },

  methods: {
    goEdit(id) {
      this.$router.push(`/reserve/edit?rid=${id}`)
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
  padding: 40px 16px;
}

/* กล่องกลาง */
.wrapper {
  max-width: 720px;
  margin: auto;
}

h2 {
  margin-bottom: 20px;
  color: #d35400;
}

/* ไม่มีข้อมูล */
.empty {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 6px 16px rgba(0,0,0,.1);
}

/* Card */
.card {
  background: #fff;
  padding: 18px;
  margin-bottom: 14px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,.12);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* แถวบน */
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table {
  font-weight: bold;
  color: #ff7a00;
}

/* สถานะ */
.status {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: bold;
  background: #eee;
}

.status.pending {
  background: #fff3cd;
  color: #856404;
}

.status.confirmed {
  background: #d4edda;
  color: #155724;
}

.status.cancelled {
  background: #f8d7da;
  color: #721c24;
}

/* ปุ่ม */
button {
  margin-top: 10px;
  align-self: flex-end;
  background: linear-gradient(135deg, #ff7a00, #ff9a3c);
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(255,122,0,.4);
}
</style>
