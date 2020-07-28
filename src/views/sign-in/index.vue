<template>
  <v-container>
    <v-card
      max-width="400"
      class="mx-auto">
      <v-card-title>
        Smart Food Court Manager
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="username"
          label="Username">
        </v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          label="Password">
        </v-text-field>
        
      </v-card-text>
      <v-card-actions>
        <v-btn
          block
          text
          @click="signin">
          Sign in
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import http from '../../http'

export default {
  methods: {
    signin() {
      let username = this.username
      let password = this.password
      if (username.length > 0 && password.length > 0) {
        http.server.get('vendor-owner/' + username + '/' + password)
          .then((response) =>  response.data)
          .then((vendorOwner) => {
            if (vendorOwner !== null) {
              this.$store.commit('setAccount', vendorOwner)
              localStorage.setItem('account', JSON.stringify(vendorOwner))
              this.$router.replace('/menu')
            } else {
              alert('Wrong username or password')
            }
          })
      } else {
        alert("Wrong input!")
      }
    }
  },

  data: () => ({
    username: "",
    password: ""
  })
}
</script>