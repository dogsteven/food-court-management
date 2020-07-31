<template>
  <v-app>
    <v-navigation-drawer
      app
      fixed
      v-model="isShowDrawer"
      v-if="$store.state.account.id != null">
      <v-list>
        <v-list-item
          to='/menu'
          color="orange">
          <v-list-item-icon>
            <v-icon>fas fa-hamburger</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Menu</v-list-item-title>
        </v-list-item>
        <v-list-item
          to='/image-uploader'
          color="orange">
          <v-list-item-icon>
            <v-icon>fas fa-images</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Image</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="signout"
          color="orange">
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
      color="orange"
      v-if="$store.state.account.id != null">
      <v-btn
        icon
        @click="isShowDrawer = !isShowDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title>
        {{ toolbarTitle() }}
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-icon
        v-if="$route.name === 'MenuView'"
        @click="addNewFoodItem">
        mdi-plus
      </v-icon>

      <v-icon
        v-if="$route.name === 'ItemDetailView'"
        @click="removeItem($route.params.id)">
        mdi-delete
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
    toolbarTitle() {
      if (this.$route.name === 'MenuView')
        return 'Menu'
      if (this.$route.name === 'ImageUploaderView')
        return "Image Uploader"
      if (this.$route.name === 'ItemDetailView')
        return this.$store.state.foods[this.$store.state.foods.findIndex(i => i.id === this.$route.params.id)].name
    },
    
    removeItem(id) {
      let username = this.$store.state.account.username
      let password = this.$store.state.account.password
      http.server.delete('manager/food-item/' + username + '/' + password + '/' + id)
        .then((response) => response.data)
        .then((res) => {
          if (res.status === true) {
            let index = this.$store.state.foods.findIndex((item) => item.id === id)
            this.$store.commit('removeFoodItem', index)
            this.$router.replace('/menu')
          }
        })
    },

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
