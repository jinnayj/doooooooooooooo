<template>
<div>
  <h4>รายการจองโต๊ะ</h4>
  <div v-for="r in list" :key="r.id" class="card p-3 mb-2">
    โต๊ะ {{r.table_no}} | {{r.name}} | {{r.status}}
    <button class="btn btn-sm btn-orange mt-2" @click="confirm(r.id)">ยืนยัน</button>
  </div>
</div>
</template>

<script>
export default{
 async mounted(){
  this.list=(await this.$axios.get('reservations/list.php')).data
 },
 data(){return{list:[]}},
 methods:{
  confirm(id){
   this.$axios.post('reservations/confirm.php',{id})
  }
 }
}
</script>
