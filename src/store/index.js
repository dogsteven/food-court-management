import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account: {
      id: null,
      vendorID: null,
      username: null,
      password: null,
      firstname: null,
      lastname: null,
      email: null
    },

    foods: []
  },
  mutations: {
    setAccount(state, {id, vendorID, username, password, firstname, lastname, email}) {
      state.account.id = id
      state.account.vendorID = vendorID
      state.account.username = username
      state.account.password = password
      state.account.firstname = firstname
      state.account.lastname = lastname
      state.account.email = email
    },

    pushFoodItem(state, item) {
      state.foods.push(item)
    },

    modifyFoodItem(state, { id, name, price, categories, description, photo }) {
      let index = state.foods.findIndex((item) => item.id === id)
      if (index !== -1) {
        state.foods[index].name = name
        state.foods[index].price = price
        state.foods[index].categories = categories
        state.foods[index].description = description
        state.foods[index].photo = photo
      }
    },

    removeFoodItem(state, index) {
      state.foods.splice(index, 1)
    },

    increaseFoodItemQuantity(state, { id, amount }) {
      let index = state.foods.findIndex((item) => item.id === id)
      if (index !== -1) {
        if (amount > 0) {
          state.foods[index].quantity += amount
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
