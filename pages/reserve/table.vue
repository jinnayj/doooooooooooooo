<template>
  <div class="step-page">
    <div class="card">
      <!-- Header -->
      <div class="header">
        <h4>🪑 เลือกโต๊ะ</h4>
        <p class="subtitle">เลือกโต๊ะที่ต้องการสำหรับการจอง</p>
      </div>

      <!-- Table Grid -->
      <TableGrid
        :selected="table_id"
        @select="select"
      />

      <!-- Next Button -->
      <button
        v-if="table_id"
        class="btn-next"
        @click="goNext"
      >
        ถัดไป →
      </button>
    </div>
  </div>
</template>

<script>
import TableGrid from '~/components/TableGrid.vue'

export default {
  components: { TableGrid },
  data() {
    return {
      table_id: null
    }
  },
  methods: {
    select(id) {
      this.table_id = id
    },
    goNext() {
      this.$router.push(`/reserve/form?table=${this.table_id}`)
    }
  }
}
</script>

<style scoped>
/* พื้นหลัง */
.step-page {
  min-height: 100vh;
  width: 100vw;
  background:
    radial-gradient(circle at top, #fff7ed, transparent 60%),
    linear-gradient(135deg, #ffe7cf, #ffd2a8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
}

/* Card */
.card {
  width: 100%;
  max-width: 720px;
  background: #fff;
  border-radius: 22px;
  padding: 24px;
  box-shadow: 0 18px 40px rgba(0,0,0,.12);
}

/* Header */
.header {
  margin-bottom: 16px;
}

h4 {
  margin: 0;
  font-size: 22px;
  color: #d35400;
}

.subtitle {
  font-size: 14px;
  color: #777;
  margin-top: 4px;
}

/* Next Button */
.btn-next {
  margin-top: 24px;
  padding: 14px;
  width: 100%;
  background: linear-gradient(135deg, #ff7a00, #ff9a3c);
  border: none;
  color: white;
  border-radius: 14px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.25s;
}

.btn-next:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255,122,0,0.4);
}
</style>
