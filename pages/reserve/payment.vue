<template>
  <div class="page">
    <div class="card">
      <h3>💳 ชำระค่ามัดจำ</h3>

      <p class="rid">รหัสการจอง: {{ rid }}</p>
      <p class="price">💰 ค่ามัดจำ 500 บาท</p>

      <img src="/qrc.jpg" class="qr" alt="QR Code" />

      <p class="hint">สแกนเพื่อชำระเงิน แล้วอัปโหลดสลิป</p>

      <input
        type="file"
        accept="image/*"
        @change="onFile"
      />

      <button @click="pay">
        ยืนยันการชำระเงิน
      </button>
    </div>
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
  max-width: 420px;
  width: 100%;
  padding: 24px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 16px 36px rgba(0,0,0,.15);
  text-align: center;
  animation: fadeUp 0.5s ease;
}

h3 {
  margin-bottom: 12px;
  color: #d35400;
}

.rid {
  font-size: 14px;
  color: #777;
}

.price {
  color: #ff7a00;
  font-weight: bold;
  margin: 10px 0;
}

.qr {
  width: 220px;
  margin: 16px auto;
  border-radius: 12px;
}

.hint {
  font-size: 13px;
  color: #666;
  margin-bottom: 10px;
}

input[type="file"] {
  margin: 10px 0;
}

/* Button */
button {
  width: 100%;
  margin-top: 14px;
  background: linear-gradient(135deg, #ff7a00, #ff9a3c);
  color: #fff;
  border: none;
  padding: 12px;
  border-radius: 14px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.25s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(255,122,0,.45);
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
