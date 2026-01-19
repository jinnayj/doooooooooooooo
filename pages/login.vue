<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const res = await this.$axios.$post('auth/login.php', {
          email: this.email,
          password: this.password
        })

        console.log('LOGIN RESPONSE:', res)

        if (res.success) {
          this.$router.push('/reserve/table')
        } else {
          alert(res.message)
        }

      } catch (e) {
        console.error('LOGIN ERROR:', e)
        alert('เชื่อมต่อ backend ไม่ได้')
      }
    }
  }
}
</script>
