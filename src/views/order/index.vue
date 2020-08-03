<template>
  <v-container>
    <v-btn
      block
      @click="cook">
      Cook
    </v-btn>
    <v-card
      class="my-4">
      <v-card-title>
        Waiting Orders
      </v-card-title>
      <v-card-text>
        <span v-if="waitingOrders.length === 0">Waiting Queue is empty!</span>
        <v-row
          v-for="orderItem in waitingOrders"
          :key="orderItem.id">
          <v-col>
            Order-item with ID: {{ orderItem.id }}
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card
      class="my-4">
      <v-card-title>
        Cooking Orders
      </v-card-title>
      <v-card-text>
        <span v-if="cookingOrders.length === 0">Cooking List is empty!</span>
        <v-row
          v-for="orderItem in cookingOrders"
          :key="orderItem.id">
          <v-col>
            Order-item with ID: {{ orderItem.id }}
          </v-col>
          <v-btn
            text
            color="green"
            @click="complete(orderItem.id)">
            Complete
          </v-btn>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card
      class="my-4">
      <v-card-title>
        Completed Orders
      </v-card-title>
      <v-card-text>
        <span v-if="completedOrders.length === 0">Completed List is empty!</span>
        <v-row
          v-for="orderItem in completedOrders"
          :key="orderItem.id">
          <v-col>
            Order-item with ID: {{ orderItem.id }}
          </v-col>
          <v-btn
            text
            color="green"
            @click="take(orderItem.id)">
            Take
          </v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import http from '../../http'

export default {
  methods: {
    cook() {
      http.server.get('manager/order/cook/' + this.$store.state.account.vendorID)
        .then(({ data }) => data)
        .then(({ status }) => {
          if (status)
            this.load()
        })
    },

    complete(id) {
      http.server.get('manager/order/complete/' + this.$store.state.account.vendorID + '/' + id)
        .then(({ data }) => data)
        .then(({ status }) => {
          if (status)
            this.load()
        })
    },

    take(id) {
      http.server.get('manager/order/take/' + this.$store.state.account.vendorID + '/' + id)
        .then(({ data }) => data)
        .then(({ status }) => {
          if (status)
            this.load()
        })
    },

    load() {
      http.server.get('manager/order/' + this.$store.state.account.vendorID)
        .then(response => response.data)
        .then(({ waiting, cooking, completed }) => {
          this.waitingOrders = waiting
          this.cookingOrders = cooking
          this.completedOrders = completed
        })
    }
  },

  created() {
    this.load()
  },

  data: () => ({
    waitingOrders: [],
    cookingOrders: [],
    completedOrders: []    
  })
}
</script>