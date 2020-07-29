<template>
  <v-container>
    <v-list>
      <v-card
        v-for="(item, index) in this.ordersDetail"
        :key="index"
        class="my-3">
        <v-card
          class="mx-auto"
          max-width="1200"
        >

          <v-card-title>
            Bill number:  {{ index }}
          </v-card-title>

          <v-card-subtitle>
            Brief: {{item[0].name}}...
          </v-card-subtitle>

          <v-card-actions>
            <v-btn text>Done</v-btn>

            <v-btn
              color="purple"
              text
              @click="acceptBill(index)"
            >
              Accept Bill
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              icon
              @click="show = !show"
            >
              <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>
              <v-card
                v-for="(food, idx) in item"
                :key="idx"
                class="my-3">
                <!-- ------------------------------------------- -->
                <v-row
                  align="center"
                  class="spacer"
                  no-gutters
                >
                  <v-col
                    cols="4"
                    sm="1"
                    md="1"
                  >
                    <v-avatar
                      size="60px"
                    >
                      <img
                        :src= "food.photo"
                      >
                    </v-avatar>
                  </v-col>
                  <v-col
                    cols="10"
                    sm="5"
                    md="1"
                  >
                  <v-card-title>
                    {{food.name}}
                  </v-card-title>
                  <v-card-subtitle>
                    Quantity: {{food.quantity}}
                  </v-card-subtitle>
                  </v-col>
                </v-row>
                <!-- +++++++++++++++++++++++++++++++++++++++++++++== -->
              </v-card>
            </div>
          </v-expand-transition>
        </v-card>
      </v-card>
    </v-list>
  </v-container>
</template>



<script>
import http from '../../http'

export default {
  data: () => ({
    show: false,
    ordersDetail: [],
    imgsrc: ''
  }),

  created() {
    this.$store.state.orders= []
    http.server.get('manager/unpaidorder/' + this.$store.state.account.vendorID)
      .then((response) => response.data)
      .then((orders) => {
        const arrOrders = Object.keys(orders).map(i => Object.assign({}, {'id': i}, orders[i]))
        arrOrders.forEach((item) => {
          let listFoods = []
          item.items.forEach(item => {
            let index = this.$store.state.foods.findIndex((element) => element.id == item.foodID)
            if (index > -1) {
              listFoods.push(this.$store.state.foods[index])
            }
          })
          if (listFoods.length > 0) {
            this.ordersDetail.push(listFoods)
          }
          this.$store.commit('pushOrderItem', item)
        })
      })
  },
}
</script>