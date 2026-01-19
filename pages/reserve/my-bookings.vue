
<template>
  <div class="page">
    <h2>📋 รายการจองของฉัน</h2>

    <div v-if="bookings.length === 0">
      ไม่มีรายการจอง
    </div>

    <div
      v-for="r in bookings"
      :key="r.id"
      class="card"
    >
      <p>โต๊ะ: {{ r.table_id }}</p>
      <p>ชื่อ: {{ r.name }}</p>
      <p>โทร: {{ r.phone }}</p>
      <p>วันที่: {{ r.reserve_date }} เวลา: {{ r.reserve_time }}</p>
      <p>สถานะ: {{ r.status }}</p>

      <button @click="goEdit(r.id)">
        แก้ไขการจอง
      </button>
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
      const res = await this.$axios.get('reservations/my_bookings.php')
      this.bookings = res.data || []
    } catch (e) {
      console.error('โหลดรายการจองไม่สำเร็จ', e)
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
.page {
  max-width: 700px;
  margin: auto;
}
.card {
  background: #fff;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,.1);
}
button {
  background: #ff7a00;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
}
</style>
