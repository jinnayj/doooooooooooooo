<template>
  <div class="page">
    <div class="card">
      <h2>🍽️ ระบบจองโต๊ะ</h2>

      <!-- เลือกวันเวลา -->
      <div class="form">
        <div class="field">
          <label>วันที่</label>
          <input type="date" v-model="date" />
        </div>

        <div class="field">
          <label>เวลา</label>
          <input type="time" v-model="time" />
        </div>

        <button class="btn" @click="loadTables">
          ค้นหาโต๊ะ
        </button>

        <p v-if="error" class="error">{{ error }}</p>
      </div>

      <!-- แสดงโต๊ะ -->
      <div v-if="tables.length" class="tables">
        <h3>เลือกโต๊ะ</h3>

        <div class="table-grid">
          <div
            v-for="t in tables"
            :key="t.id"
            class="table-card"
            :class="{ active: table && table.id === t.id }"
            @click="selectTable(t)"
          >
            <div class="table-name">{{ t.table_name }}</div>
            <div class="seats">{{ t.seats }} ที่นั่ง</div>
          </div>
        </div>
      </div>

      <!-- ฟอร์มผู้จอง -->
      <div v-if="table" class="selected">
        <p class="success">
          ✅ เลือกโต๊ะ <b>{{ table.table_name }}</b>
        </p>

        <div class="field">
          <label>ชื่อผู้จอง</label>
          <input v-model="name" placeholder="ชื่อ-นามสกุล" />
        </div>

        <div class="field">
          <label>เบอร์โทร</label>
          <input v-model="phone" placeholder="08xxxxxxxx" />
        </div>

        <p class="deposit">💰 มัดจำ {{ deposit }} บาท</p>

        <button class="btn confirm" @click="reserve">
          ยืนยันการจอง
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: '',
      time: '',
      tables: [],
      table: null,
      name: '',
      phone: '',
      deposit: 500,
      error: ''
    }
  },

  methods: {
    async loadTables() {
      this.error = ''

      if (!this.date || !this.time) {
        this.error = 'กรุณาเลือกวันที่และเวลา'
        return
      }

      try {
        const res = await this.$axios.get('tables.php', {
          params: { date: this.date, time: this.time }
        })

        this.tables = res.data || []
        this.table = null
      } catch (e) {
        this.error = 'โหลดรายการโต๊ะไม่สำเร็จ'
        console.error(e)
      }
    },

    selectTable(t) {
      this.table = t
    },

    async reserve() {
      if (!this.table || !this.name || !this.phone) {
        this.error = 'กรุณากรอกข้อมูลให้ครบ'
        return
      }

      try {
        await this.$axios.post('reserve.php', {
          table_id: this.table.id,
          name: this.name,
          phone: this.phone,
          date: this.date,
          time: this.time,
          deposit: this.deposit
        })

        alert('🎉 จองสำเร็จ รอชำระมัดจำ')

        // reset
        this.name = ''
        this.phone = ''
        this.tables = []
        this.table = null
      } catch (e) {
        alert('จองไม่สำเร็จ')
        console.error(e)
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
  justify-content: center;
  padding: 40px 16px;
}

/* Card หลัก */
.card {
  width: 100%;
  max-width: 720px;
  background: #fff;
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 20px 40px rgba(0,0,0,.12);
}

/* Form */
.form {
  display: grid;
  gap: 12px;
}

.field label {
  font-size: 13px;
  color: #555;
}

input {
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ddd;
}

input:focus {
  outline: none;
  border-color: #ff8c1a;
}

/* Button */
.btn {
  padding: 14px;
  border-radius: 14px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  background: linear-gradient(135deg, #ff7a00, #ff9a3c);
  color: #fff;
}

.confirm {
  margin-top: 10px;
}

/* โต๊ะ */
.tables {
  margin-top: 24px;
}

.table-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}

.table-card {
  padding: 14px;
  border-radius: 14px;
  border: 1px solid #ddd;
  cursor: pointer;
  text-align: center;
  transition: 0.2s;
}

.table-card:hover {
  border-color: #ff8c1a;
}

.table-card.active {
  background: #ff8c1a;
  color: #fff;
  border-color: #ff8c1a;
}

.seats {
  font-size: 13px;
  opacity: 0.8;
}

/* Selected */
.selected {
  margin-top: 24px;
}

.success {
  color: #2e7d32;
  font-weight: 500;
}

.deposit {
  font-weight: bold;
  color: #e91e63;
}

/* Error */
.error {
  color: #e74c3c;
  font-size: 14px;
}
</style>
