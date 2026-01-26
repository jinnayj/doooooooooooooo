<template>
  <div class="page">
    <div class="card">
      <h2>📝 ข้อมูลการจอง</h2>

      <p class="selected-table">
        🪑 โต๊ะที่เลือก: <b>#{{ table_id }}</b>
      </p>

      <!-- ฟอร์ม -->
      <div class="form">
        <div class="field">
          <label>วันที่</label>
          <input type="date" v-model="date" />
        </div>

        <div class="field">
          <label>เวลา</label>
          <input type="time" v-model="time" />
        </div>

        <div class="field">
          <label>ชื่อผู้จอง</label>
          <input v-model="name" />
        </div>

        <div class="field">
          <label>เบอร์โทร</label>
          <input v-model="phone" />
        </div>
      </div>

      <!-- เมนูอาหาร -->
      <div class="menus">
        <label>🍽️ เลือกเมนูอาหาร (ไม่เกิน 3 อย่าง)</label>

        <div class="menu-list">
          <label
            v-for="m in menus"
            :key="m.id"
            class="menu-item"
          >
            <input
              type="checkbox"
              :value="m"
              v-model="selectedMenus"
              :disabled="selectedMenus.length >= 3 && !selectedMenus.includes(m)"
            />
            {{ m.name }} ({{ m.price }} บาท)
          </label>
        </div>
      </div>

      <!-- ราคา -->
      <p class="deposit">
        💰 มัดจำพื้นฐาน {{ baseDeposit }} บาท
      </p>

      <p class="deposit">
        🍽️ ราคาอาหาร {{ menuTotal }} บาท
      </p>

      <p class="deposit total">
        💵 รวมทั้งหมด {{ totalDeposit }} บาท
      </p>

      <p v-if="error" class="error">{{ error }}</p>

      <button class="btn" @click="reserve">
        ยืนยันการจอง
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      table_id: null,
      name: '',
      phone: '',
      date: '',
      time: '',
      error: '',

      baseDeposit: 500,

      menus: [],
      selectedMenus: []
    }
  },

  computed: {
    menuTotal() {
      return this.selectedMenus.reduce(
        (sum, m) => sum + Number(m.price),
        0
      )
    },
    totalDeposit() {
      return this.baseDeposit + this.menuTotal
    }
  },

  async mounted() {
    this.table_id = this.$route.query.table
    if (!this.table_id) {
      this.$router.push('/tables/available')
      return
    }

    try {
      const res = await this.$axios.get('menus.php')
      this.menus = res.data
    } catch (e) {
      this.error = 'โหลดเมนูไม่สำเร็จ'
      console.error(e)
    }
  },

  methods: {
    async reserve() {
      this.error = ''

      if (!this.name || !this.phone || !this.date || !this.time) {
        this.error = 'กรุณากรอกข้อมูลให้ครบ'
        return
      }

      if (this.selectedMenus.length === 0) {
        this.error = 'กรุณาเลือกเมนูอาหาร'
        return
      }

      try {
        await this.$axios.post('reserve.php', {
          table_id: this.table_id,
          name: this.name,
          phone: this.phone,
          date: this.date,
          time: this.time,
          menus: this.selectedMenus,
          deposit: this.totalDeposit
        })

        alert('🎉 จองสำเร็จ')
        this.$router.push('/')
      } catch (e) {
        this.error = 'บันทึกการจองไม่สำเร็จ'
        console.error(e)
      }
    }
  }
}
</script>

