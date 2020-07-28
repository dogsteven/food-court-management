<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="isShowDrawer"
      v-if="$store.state.account.id != null">
      
      <v-list>
        <v-list-item
          to='/menu'>
          <v-list-item-icon>
            <v-icon>fas fa-hamburger</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Menu</v-list-item-title>
        </v-list-item>
        <v-list-item
          to='/order'>
          <v-list-item-icon>
            <v-icon>fas fa-hamburger</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Order</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="signout">
          <v-list-item-icon>
            <v-icon>fas fa-sign-out-alt</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Sign out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      dark
      v-if="$store.state.account.id != null">
      <v-btn
        icon
        @click="isShowDrawer = !isShowDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title>
        {{ $route.path === '/menu' ? 'Menu' : $route.path === '/order'  ? 'Order' : ($store.state.foods[$store.state.foods.findIndex(i => i.id === $route.params.id)].name) }}
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-icon
        v-if="$route.path === '/menu'"
        @click="addNewFoodItem">
        mdi-plus
      </v-icon>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
import http from './http'

export default {
  name: 'App',

  methods: {
    signout() {
      let emptyAccount = {
        id: null,
        vendorID: null,
        username: null,
        password: null,
        firstname: null,
        lastname: null,
        email: null
      }
      this.$store.commit('setAccount', emptyAccount)
      localStorage.removeItem('account')
      this.$router.go('/sign-in')
    },

    addNewFoodItem() {
      let data = {
        name: 'new-item-name',
        price: 0,
        quantity: 0,
        categories: [],
        description: "new-item-description",
        photo: "new-item-photo"
      }
      let config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      let username = this.$store.state.account.username
      let password = this.$store.state.account.password
      http.server.post('manager/food-item/' + username + '/' + password, data, config)
        .then((response) => response.data)
        .then((res) => {
          if (res.status === true) {
            let id = res.id
            let newFoodItem = { id: id, vendorID: this.$store.state.account.vendorID, rating: 0, ratingTimes: 0, ...data }
            this.$store.commit('pushFoodItem', newFoodItem)
            this.$router.replace('/item-detail/' + id)
          }
        })
    }
  },

  created() {
    let account = JSON.parse(localStorage.getItem('account'))
    if (account !== null) {
      let keys = ['id', 'vendorID', 'username', 'password', 'firstname', 'lastname', 'email']
      var valid = true
      for (let key of keys) {
        if ((key in account) === false) {
          valid = false
          break
        }
      }
      if (valid)
        this.$store.commit('setAccount', account)
    }
  },

  data: () => ({
    isShowDrawer: false
  }),
};
</script>
