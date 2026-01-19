<template>
  <div>
    <h4 class="mb-3">เลือกโต๊ะ</h4>

    <TableGrid
      :selected="table_id"
      @select="select"
    />

    <button
      v-if="table_id"
      class="btn-next"
      @click="goNext"
    >
      ถัดไป
    </button>
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
.btn-next {
  margin-top: 20px;
  padding: 12px;
  width: 100%;
  background: #ff7a00;
  border: none;
  color: white;
  border-radius: 8px;
  font-size: 16px;
}
</style>
