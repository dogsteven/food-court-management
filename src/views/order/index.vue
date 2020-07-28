<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
<template>
  <v-container>
    <v-btn
      class="ma-2"
      :loading="this.loading"
      :disabled="this.loading"
      color="secondary"
      @click="this.loader = 'loading'"
    >
      Accept Terms
    </v-btn>

    <v-btn
      :loading="this.loading3"
      :disabled="this.loading3"
      color="blue-grey"
      class="ma-2 white--text"
      @click="this.loader = 'loading3'"
    >
      Upload
      <v-icon right dark>mdi-cloud-upload</v-icon>
    </v-btn>

    <v-btn
      class="ma-2"
      :loading="this.loading2"
      :disabled="this.loading2"
      color="success"
      @click="thisloader = 'loading2'"
    >
      Custom Loader
      <template v-slot:loader>
        <span>Loading...</span>
      </template>
    </v-btn>

    <v-btn
      class="ma-2"
      :loading="this.loading4"
      :disabled="this.loading4"
      color="info"
      @click="this.loader = 'loading4'"
    >
      Icon Loader
      <template v-slot:loader>
        <span class="custom-loader">
          <v-icon light>cached</v-icon>
        </span>
      </template>
    </v-btn>

    <v-btn
      :loading="this.loading5"
      :disabled="this.loading5"
      color="blue-grey"
      class="ma-2 white--text"
      fab
      @click="this.loader = 'loading5'"
    >
      <v-icon dark>mdi-cloud-upload</v-icon>
    </v-btn>
    <v-list>
      <v-card
        v-for="(item, index) in $store.state.orders"
        :key="index"
        class="my-3">
        <v-img
          :src="item.photo"
          max-height="200">
        </v-img>
        <v-card-title>
          {{ item.customerID }}
        </v-card-title>
      </v-card>
    </v-list>
  </v-container>
</template>



<script>
import http from '../../http'

export default {
  data: () => ({
     data () {
      return {
        loader: null,
        loading: false,
        loading2: false,
        loading3: false,
        loading4: false,
        loading5: false,
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },
  }),

  created() {
    if (this.$store.state.foods.length === 0) {
      http.server.get('manager/unpaidorder/' + this.$store.state.account.vendorID)
        .then((response) => response.data)
        .then((orders) => {
          console.log(orders)
          const arrOrders = Object.keys(orders).map(i => orders[i])
          arrOrders.forEach((item) => {
            this.$store.commit('pushOrderItem', item)
          })
        })
    }
  }
  
}
</script>