<template>
  <div class="container">
    <h2>ระบบจองโต๊ะ</h2>

    <!-- เลือกวันเวลา -->
    <div class="form">
      <input type="date" v-model="date" />
      <input type="time" v-model="time" />
      <button @click="loadTables">ค้นหาโต๊ะ</button>
    </div>

    <!-- แสดงโต๊ะ -->
    <div class="tables" v-if="tables.length">
      <h3>เลือกโต๊ะ</h3>
      <button
        v-for="t in tables"
        :key="t.id"
        @click="selectTable(t)"
        :class="{ active: table && table.id === t.id }"
      >
        {{ t.table_name }} ({{ t.seats }} ที่นั่ง)
      </button>
    </div>

    <!-- โต๊ะที่เลือก -->
    <div v-if="table" class="selected">
      ✅ เลือกโต๊ะ: <b>{{ table.table_name }}</b>

      <h3>ข้อมูลผู้จอง</h3>
      <input v-model="name" placeholder="ชื่อผู้จอง" />
      <input v-model="phone" placeholder="เบอร์โทร" />

      <p class="deposit">มัดจำ 500 บาท</p>
      <button class="confirm" @click="reserve">ยืนยันการจอง</button>
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
      deposit: 500
    }
  },

  methods: {
    async loadTables() {
      if (!this.date || !this.time) {
        alert('กรุณาเลือกวันที่และเวลา')
        return
      }

      try {
        const res = await this.$axios.get('tables.php', {
          params: {
            date: this.date,
            time: this.time
          }
        })

        this.tables = res.data
        this.table = null
      } catch (e) {
        alert('โหลดโต๊ะไม่สำเร็จ')
        console.error(e)
      }
    },

    selectTable(t) {
      this.table = t
    },

    async reserve() {
      if (!this.table || !this.name || !this.phone) {
        alert('กรุณากรอกข้อมูลให้ครบ')
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

        alert('จองสำเร็จ รอชำระมัดจำ')

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
.container {
  max-width: 500px;
  margin: auto;
}

.form input,
.form button {
  margin: 5px 0;
  width: 100%;
  padding: 8px;
}

.tables button {
  margin: 5px;
  padding: 10px;
  cursor: pointer;
}

.tables button.active {
  background: #4caf50;
  color: #fff;
}

.selected {
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 15px;
}

.deposit {
  font-weight: bold;
  color: #e91e63;
}

.confirm {
  width: 100%;
  padding: 10px;
  background: #2196f3;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
