<template>
<div class="card p-4 shadow">
  <h4 class="mb-3">เลือกวันและเวลา</h4>
  <input type="date" v-model="date" class="form-control mb-2">
  <input type="time" v-model="time" class="form-control mb-3">
  <button class="btn btn-orange" @click="go">ถัดไป</button>
</div>
</template>

<script>
export default{
 data(){return{date:'',time:''}},
 methods:{
  go(){
   this.$router.push(`/reserve/table?date=${this.date}&time=${this.time}`)
  }
 }
}
</script>
