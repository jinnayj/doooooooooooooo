<template>
  <div class="grid">
    <div
      v-for="n in 30"
      :key="n"
      class="table"
      :class="{ active: selected === n }"
      @click="$emit('select', n)"
    >
      โต๊ะ {{ n }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableGrid',
  props: {
    selected: {
      type: Number,
      default: null
    }
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}
.table {
  padding: 20px;
  background: #ffe3cf;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
}
.table.active {
  background: #ff7a00;
  color: white;
}
</style>
