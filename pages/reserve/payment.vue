<template>
  <div class="page">
    <div class="card">
      <!-- Header -->
      <div class="header">
        <h2>💳 ชำระค่ามัดจำ</h2>
        <p class="subtitle">สแกน QR เพื่อโอนเงิน และอัปโหลดสลิป</p>
      </div>

      <!-- QR -->
      <div class="qr-box">
        <img
          src="/qr.png"
          alt="QR Payment"
          class="qr"
        />
        <p class="amount">ยอดมัดจำ <b>500 บาท</b></p>
      </div>

      <!-- Upload -->
      <div class="upload-box">
        <label class="upload-btn">
          📤 เลือกรูปสลิป
          <input type="file" hidden @change="onFile" />
        </label>

        <p v-if="file" class="filename">
          {{ file.name }}
        </p>
      </div>

      <!-- Error -->
      <p v-if="error" class="error">{{ error }}</p>

      <!-- Button -->
      <button class="confirm" @click="upload">
        ✅ ยืนยันการชำระ
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      error: ''
    }
  },

  computed: {
    bookingId() {
      return this.$route.query.id
    }
  },

  methods: {
    onFile(e) {
      this.file = e.target.files[0]
    },

    async upload() {
      this.error = ''

      if (!this.bookingId) {
        this.error = 'ไม่พบรหัสการจอง'
        return
      }

      if (!this.file) {
        this.error = 'กรุณาอัปโหลดสลิป'
        return
      }

      const fd = new FormData()
      fd.append('id', this.bookingId)
      fd.append('slip', this.file)

      try {
        const res = await this.$axios.post(
          'http://localhost:8081/backend-1/reservations/upload-slip.php',
          fd
        )

        if (res.data.success) {
          alert('🎉 ชำระเงินเรียบร้อย')
          this.$router.push('/reserve/my-bookings')
        } else {
          this.error = res.data.message || 'อัปโหลดไม่สำเร็จ'
        }
      } catch (e) {
        console.error(e)
        this.error = 'เชื่อมต่อ backend ไม่ได้'
      }
    }
  }
}
</script>

<style scoped>
/* Page */
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background:
    radial-gradient(circle at top, #fff3e0, transparent 60%),
    linear-gradient(135deg, #ffe0c2, #ffd0a6);
  padding: 20px;
}

/* Card */
.card {
  width: 100%;
  max-width: 380px;
  background: #fff;
  border-radius: 24px;
  padding: 26px;
  box-shadow: 0 18px 40px rgba(0,0,0,.15);
  text-align: center;
}

/* Header */
.header h2 {
  margin: 0;
  color: #e67e22;
}

.subtitle {
  font-size: 13px;
  color: #777;
  margin-top: 4px;
}

/* QR */
.qr-box {
  margin: 20px 0;
}

.qr {
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 10px 24px rgba(0,0,0,.15);
}

.amount {
  margin-top: 10px;
  font-size: 15px;
  color: #d35400;
}

/* Upload */
.upload-box {
  margin-top: 16px;
}

.upload-btn {
  display: inline-block;
  padding: 10px 18px;
  background: #fff4e6;
  color: #d35400;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
}

.upload-btn:hover {
  background: #ffe8cc;
}

.filename {
  margin-top: 8px;
  font-size: 12px;
  color: #555;
}

/* Error */
.error {
  margin-top: 12px;
  color: #e74c3c;
  font-size: 14px;
}

/* Button */
.confirm {
  margin-top: 18px;
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #ff7a00, #ff9a3c);
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.25s;
}

.confirm:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(255,122,0,0.45);
}
</style>
