<template>
  <v-container>

  </v-container>
</template>

<script>
export default {
  methods: {
  },

  created() {
    this.id = this.$route.params.id
    let index = this.$store.state.orders.findIndex((item) => item.id === this.id)
    if (index === -1) {
      this.$router.replace('/order')
    } else {
      this.orders = this.$store.state.orders[index].items
    }
  },

  data: () => ({
    orders: []
  })
}
</script>