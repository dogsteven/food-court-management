<template>
  <v-container>

    <v-card
      v-for="(id, index) in images"
      :key="id"
      class="mx-auto my-4"
      max-width="600">
      <v-img
        :src="'http://localhost/api/image-item/' + id"
        aspect-ratio="1"
        @click="selectItem(index)">
      </v-img>
      <v-card-actions>
        <v-expand-transition>
          <v-row
            v-if="selectedItem === index">
            <v-col>
              <v-btn  
                text
                block
                color="red"
                @click="removeItem">
                Delete
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                text
                block
                color="green"
                @click="getURL(id)">
                Get URL
              </v-btn>
            </v-col>
          </v-row>
        </v-expand-transition>
      </v-card-actions>
    </v-card>

    <v-footer
      app
      inset>
      <v-file-input
        color="green"
        v-model="file"
        label="Image"
        prepend-icon=""
        clear-icon="mdi-close">
        <template v-slot:selection='{ text }'>
          {{ text }}
        </template>
      </v-file-input>
      <v-btn
        color="green"
        @click="uploadImage"
        text>
        Upload
      </v-btn>
    </v-footer>
  </v-container>
</template>

<script>
import http from '../../http'

export default {
  created() {
    let vendorID = this.$store.state.account.vendorID
    http.server.get('image-item/vendorID/' + vendorID)
      .then((response) => response.data)
      .then((data) => {
        console.log(data)
        this.images = data
      })
  },

  methods: {
    getURL(id) {
      let clipboard = navigator.clipboard
      clipboard.writeText(http.server.serverURL + 'image-item/' + id)
    },

    selectItem(index) {
      if (this.selectedItem === index)
        this.selectedItem = null
      else 
        this.selectedItem = index
    },

    removeItem() {
      let id = this.images[this.selectedItem]
      let username = this.$store.state.account.username
      let password= this.$store.state.account.password
      if (this.selectedItem === null)
        return
      http.server.delete('image-item/' + id + '/' + username + '/' + password)
        .then((res) => res.data)
        .then(({ error, status }) => {
          if (status) {
            this.images.splice(this.selectedItem, 1)
            this.selectedItem = null
          } else
            console.log(error)
        })
    },

    uploadImage() {
      if (this.file === null)
        return
      let username = this.$store.state.account.username
      let password = this.$store.state.account.password
      let form = new FormData()
      form.append("file", this.file)
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }

      http.server.post('image-item/' + username + '/' + password, form, config)
        .then((response) => response.data)
        .then(({ error, id }) => {
          if (error !== null) 
            console.log(error)
          if (id !== null) {
            this.images.push(id)
            this.file = null
          }
        })
    }
  },

  data: () => ({
    file: null,
    images: [],
    selectedItem: null
  })
}
</script>