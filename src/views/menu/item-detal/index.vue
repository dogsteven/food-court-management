<template>
  <v-container>
    <v-card
      max-width="600"
      class="mx-auto">
      <v-img
        :src="photo"
        aspect-ratio="1">
      </v-img>
      <v-card-title>
        <v-text-field
          v-model="name"
          label="Name">
        </v-text-field>
      </v-card-title>
      <v-card-subtitle>
        <v-text-field
          v-model="price"
          label="Price (VND)">
        </v-text-field>
      </v-card-subtitle>
      <v-card-text>
        <v-text-field
          v-model="quantityInput"
          :label="'Quantity (current: ' + this.quantity + '):'">
        </v-text-field>
        <v-text-field
          v-model="categoriesInput"
          label="Categories">
        </v-text-field>
        <v-textarea
          v-model="description">
        </v-textarea>
        <v-text-field
          v-model="photo"
          label="Photo's URL">
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-row>
          <v-col>
            <v-btn
              text
              block
              dark
              color="green"
              @click="update">
              Save
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              text
              block
              dark
              color="primary"
              @click="$router.replace('/menu')">
              Cancel
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <v-snackbar
      dark
      v-model=isShowAlert>
      Saved

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          color="error"
          v-bind="attrs"
          @click="isShowAlert = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import http from '../../../http'
export default {
  methods: {
    update() {
      this.categories = this.categoriesInput.split(', ')
      let data = {
        name: this.name,
        price: this.price,
        categories: this.categories,
        description: this.description,
        photo: this.photo
      }
      let config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      let username = this.$store.state.account.username
      let password = this.$store.state.account.password
      http.server.put('manager/food-item/' + username + '/' + password + '/' + this.id, data, config)
        .then((response) => response.data)
        .then((res) => {
          if (res.status === true) {
            this.$store.commit('modifyFoodItem', { id: this.id, ...data })
            http.server.put('manager/food-item/' + username + '/' + password + '/' + this.id + '/increaseQuantity/' + this.quantityInput, {}, config)
              .then((response) => response.data)
              .then((res) => {
                if (res.status === true) {
                  let amount = Number(this.quantityInput)
                  this.$store.commit('increaseFoodItemQuantity', { id: this.id, amount: amount })
                  this.quantity += amount
                  this.quantityInput = 0
                }
              })
            this.isShowAlert = true
          } else {
            alert('Food Item with name ' + this.name + ' is not exist!')
          }
        })

      
    }
  },

  created() {
    this.id = this.$route.params.id
    let index = this.$store.state.foods.findIndex((item) => item.id === this.id)
    if (index === -1) {
      this.$router.replace('/menu')
    } else {
      this.name = this.$store.state.foods[index].name
      this.price = this.$store.state.foods[index].price
      this.quantity = this.$store.state.foods[index].quantity
      this.categories = this.$store.state.foods[index].categories
      this.description = this.$store.state.foods[index].description
      this.photo = this.$store.state.foods[index].photo
      if (this.categories.length > 0)
        this.categoriesInput = this.categories.join(', ')
    }
  },

  data: () => ({
    id: null,
    name: "",
    price: "",
    quantity: 0,
    categories: [],
    description: "",
    photo: "",
    categoriesInput: "",
    quantityInput: 0,
    isShowAlert: false
  })
}
</script>