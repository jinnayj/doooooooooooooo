<template>
  <v-container>
    <v-row justify="center" class="mb-4">
      <v-col cols="12" class="text-center">
        <h2>รายการแนะนำ</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="item in product"
        :key="item.id"
        cols="12"   
        sm="6"      
        md="4"      
        lg="3"      
        class="d-flex"
      >
        <v-card class="w-100">
          <v-card-text class="text-center">
            <div class="font-weight-bold">{{ item.name }}</div>
            <div>ราคา: {{ item.price }} บาท</div>
            <div>{{ item.detail }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ProductList',
  data() {
    return {
      product: [
        { id: 1, name: 'กุ้งฝอยทอด', price: 150,  },
        { id: 2, name: 'ทอดมันกุ้ง', price: 150,  },
        { id: 3, name: 'ทอดมันปลากราย', price: 160,  },
        { id: 4, name: 'ต้มยำปลาคัง', price: 180,  },
        { id: 5, name: 'ปลาคังลวกจิ้ม', price: 160,  },
        { id: 6, name: 'ห่อหมกทะเล', price: 200,  },
        { id: 7, name: 'แหนมซี่โครงหมูทอด', price: 185,  },
        { id: 8, name: 'หมึกไข่นึ่งมะนาว', price: 250,  },
      ],
    }
  },
}
</script>

<style scoped>
/* ทำให้ card เต็มความกว้างของ col */
.v-card {
  width: 100%;
}
</style>