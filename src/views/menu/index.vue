<template>
  <v-container>
    <v-list>
      <v-card
        v-for="(item, index) in $store.state.foods"
        :key="index"
        class="my-3"
        :to="'/item-detail/' + item.id">
        <v-img
          :src="item.photo"
          max-height="200">
        </v-img>
        <v-card-title>
          {{ item.name}}
        </v-card-title>
        <v-card-subtitle>
          Price {{ item.price }} VND
        </v-card-subtitle>
      </v-card>
    </v-list>
  </v-container>
</template>

<script>
import http from '../../http'

export default {
  created() {
    if (this.$store.state.foods.length === 0) {
      http.server.get('manager/food-item/' + this.$store.state.account.vendorID)
        .then((response) => response.data)
        .then((foods) => {
          const arrFoods = Object.keys(foods).map(i => foods[i])
          arrFoods.forEach((item) => {
            this.$store.commit('pushFoodItem', item)
          })
        })
    }
  },

  data: () => ({

  })
}
</script>