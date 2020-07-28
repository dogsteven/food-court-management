<template>
  <v-container>
    <v-list>
      <v-card
        v-for="(item, index) in $store.state.foods"
        :key="index"
        class="my-3 mx-auto"
        :to="'/item-detail/' + item.id"
        max-width="600">
        <v-img
          :src="item.photo"
          aspect-ratio="1">
        </v-img>
        <v-card-title>
          {{ item.name }}
        </v-card-title>
        <v-card-subtitle>
          Price {{ item.price }}VND
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
          foods.forEach((item) => {
            this.$store.commit('pushFoodItem', item)
          })
        })
    }
  },

  data: () => ({

  })
}
</script>