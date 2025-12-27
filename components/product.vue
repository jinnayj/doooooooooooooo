<template>
  <div>
    <v-btn color="info" class="mr-2" @click="productQuery">
      Load Product Data
    </v-btn>

    <v-btn color="success" @click="openInsertDialog">
      Insert Data
    </v-btn>

    <v-data-table
      :headers="headers"
      :items="product"
      class="mt-4"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn small color="warning" @click="openEditDialog(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <v-btn small color="error" @click="deleteProduct(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Dialog -->
    <v-dialog v-model="productDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h6 grey lighten-2">
          Product
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field
              v-model="productForm.products_name"
              label="Name"
              required
            />
            <v-text-field
              v-model="productForm.products_price"
              label="Price"
              type="number"
              required
            />
            <v-textarea
              v-model="productForm.products_detail"
              label="Detail"
            />
          </v-form>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="productDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="saveProduct">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'Product ID', value: 'products_id' },
        { text: 'Name', value: 'products_name' },
        { text: 'Price', value: 'products_price' },
        { text: 'Detail', value: 'products_detail' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      product: [],
      productDialog: false,
      isEdit: false,
      productForm: {
        products_id: null,
        products_name: '',
        products_price: '',
        products_detail: ''
      }
    }
  },

  mounted() {
    this.productQuery()
  },

  methods: {
    // 🔹 SELECT
    async productQuery() {
      const res = await this.$axios.post(
        'http://localhost/myfirstjobapp_api/products_select.php'
      )
      this.product = res.data
    },

    // 🔹 OPEN INSERT
    openInsertDialog() {
      this.isEdit = false
      this.productForm = {
        products_id: null,
        products_name: '',
        products_price: '',
        products_detail: ''
      }
      this.productDialog = true
    },

    // 🔹 OPEN EDIT
    openEditDialog(item) {
      this.isEdit = true
      this.productForm = { ...item }
      this.productDialog = true
    },

    // 🔹 INSERT / UPDATE
    async saveProduct() {
      try {
        if (this.isEdit) {
          await this.$axios.post(
            'http://localhost/myfirstjobapp_api/products_update.php',
            this.productForm
          )
        } else {
          await this.$axios.post(
            'http://localhost/myfirstjobapp_api/products_insert.php',
            this.productForm
          )
        }

        this.productDialog = false
        this.productQuery()
      } catch (err) {
        console.error(err)
        alert('บันทึกไม่สำเร็จ')
      }
    },

    // 🔹 DELETE
    async deleteProduct(item) {
      if (!confirm('Delete this product?')) return

      await this.$axios.post(
        'http://localhost/myfirstjobapp_api/products_delete.php',
        { products_id: item.products_id }
      )

      this.productQuery()
    }
  }
}
</script>
