<template>
  <div class="page">
    <h2 class="title">📋 รายการจองของฉัน</h2>

    <div class="list">
      <div
        v-for="r in bookings"
        :key="r.id"
        class="card"
      >
        <!-- แถวบน -->
        <div class="top">
          <span class="table">โต๊ะ #{{ r.table_id }}</span>
          <span class="status" :class="r.status">
            {{ r.status }}
          </span>
        </div>

        <!-- ข้อมูล -->
        <div class="info">
          <div>
            <span class="label">ชื่อ</span>
            <span>{{ r.name }}</span>
          </div>
          <div>
            <span class="label">วันที่</span>
            <span>{{ r.reserve_date }}</span>
          </div>
          <div>
            <span class="label">เวลา</span>
            <span>{{ r.reserve_time }}</span>
          </div>
        </div>

        <!-- ปุ่ม -->
        <button class="edit" @click="edit(r.id)">
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
      const res = await this.$axios.$get(
        'http://localhost:8081/backend-1/reservations/list.php'
      )
      this.bookings = res
    } catch (e) {
      alert('โหลดข้อมูลไม่สำเร็จ')
      console.error(e)
    }
  },

  methods: {
    edit(id) {
      this.$router.push(`/reserve/edit?id=${id}`)
    }
  }
}
</script>

<style scoped>
/* หน้า */
.page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top, #fff3e0, transparent 60%),
    linear-gradient(135deg, #ffe0c2, #ffd0a6);
  padding: 24px 16px;
}

/* หัวข้อ */
.title {
  text-align: center;
  margin-bottom: 18px;
  color: #d35400;
}

/* กล่องรวม (จัดกลาง) */
.list {
  max-width: 460px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* การ์ด */
.card {
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 10px 22px rgba(0,0,0,.12);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* แถวบน */
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table {
  font-weight: 600;
  color: #e67e22;
}

/* สถานะ */
.status {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
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

/* ข้อมูล */
.info {
  font-size: 13px;
  color: #444;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  color: #999;
  margin-right: 6px;
}

/* ปุ่ม */
.edit {
  margin-top: 8px;
  border: none;
  background: linear-gradient(135deg, #ff7a00, #ff9a3c);
  color: white;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
}

.edit:hover {
  opacity: 0.9;
}
</style>
