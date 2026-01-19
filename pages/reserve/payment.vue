<template>
  <div class="card">
    <h3>ชำระค่ามัดจำ</h3>

    <p class="rid">รหัสการจอง: {{ rid }}</p>
    <p class="price">💰 ค่ามัดจำ 500 บาท</p>

    <img src="/qrc.jpg" class="qr" alt="QR Code" />

    <p class="hint">สแกนเพื่อชำระเงิน แล้วอัปโหลดสลิป</p>

    <input type="file" accept="image/*" @change="onFile" />

    <button @click="pay">
      ยืนยันการชำระเงิน
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rid: this.$route.query.rid,
      slip: null
    }
  },
  methods: {
    onFile(e) {
      this.slip = e.target.files[0]
    },

    async pay() {
      if (!this.slip) {
        alert('กรุณาอัปโหลดสลิป')
        return
      }

      const form = new FormData()
      form.append('rid', this.rid)
      form.append('slip', this.slip)

      try {
        const res = await this.$axios.$post(
          'reservations/upload_slip.php',
          form
        )

        if (res.success) {
          alert('ชำระเงินเรียบร้อย')
          // 👉 ไปหน้ารายการจองของฉัน
          this.$router.push('/reserve/my-bookings')
        } else {
          alert(res.message)
        }
      } catch (e) {
        console.error(e)
        alert('อัปโหลดไม่สำเร็จ')
      }
    }
  }
}
</script>

<style scoped>
.card {
  max-width: 420px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0,0,0,.1);
  text-align: center;
}
.qr { width: 220px; margin: auto; }
.price { color: #ff7a00; font-weight: bold; }
button {
  background: #ff7a00;
  color: #fff;
  border: none;
  padding: 12px;
  border-radius: 8px;
}
</style>
