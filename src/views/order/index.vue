<template>
  <v-container>
    <v-list>
      <v-card
        v-for="(item, index) in ordersDetail"
        :key="index"
        class="my-3">
        <v-card
          class="mx-auto"
          max-width="1200"
        >
          <v-row>
            <v-col>
              <v-card-title>
                Bill number:  {{ index }}
              </v-card-title>

              <v-card-subtitle>
                Brief: {{item[0].name}}...
              </v-card-subtitle>
            </v-col>
            <v-col>
              <v-card-title>
                Current State: {{findState(index)}}
              </v-card-title>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-btn
              color="purple"
              text
              @click="() => {paidDialog = true; notInprogress = false}"
            >
              Paid
            </v-btn>
            <v-dialog
              v-model="paidDialog"
              max-width="300"
              :retain-focus="false"
            >
              <v-card>
                <v-card-title class="headline">Are you sure?</v-card-title>

                <v-card-text>
                  This activity cannot be reversed
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="green darken-1"
                    text
                    @click="paidDialog = false"
                  >
                    No
                  </v-btn>

                  <v-btn
                    color="green darken-1"
                    text
                    @click.prevent="paid(index)"
                  >
                    Yes
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-btn
              color="purple"
              text
              @click="() => {preparingDialog = true; notInprogress = false}"
            >
              Prepare
            </v-btn>
            <v-dialog
              v-model="preparingDialog"
              max-width="300"
              :retain-focus="false"
            >
              <v-card>
                <v-card-title class="headline">Are you sure for prepare this bill</v-card-title>

                <v-card-text>
                  This activity cannot be reversed
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="green darken-1"
                    text
                    @click="preparingDialog = false"
                  >
                    No
                  </v-btn>

                  <v-btn
                    color="green darken-1"
                    text
                    @click="prepare(index)"
                  >
                    Yes
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-btn
              color="purple"
              text
              @click="() => {completeDialog = true; notInprogress = false}"
            >
              Complete
            </v-btn>
            <v-dialog
              v-model="completeDialog"
              max-width="300"
              :retain-focus="false"
            >
              <v-card>
                <v-card-title class="headline"> Are you sure?</v-card-title>
                <v-card-text>
                  This activity cannot be reversed
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="green darken-1"
                    text
                    @click="completeDialog = false"
                  >
                    No
                  </v-btn>

                  <v-btn
                    color="green darken-1"
                    text
                    @click="complete(index)"
                  >
                    Yes
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-btn
              color="purple"
              text
              @click="() => {takeDialog = true; notInprogress = false}"
            >
              Take
            </v-btn>
            <v-dialog
              v-model="takeDialog"
              max-width="300"
              :retain-focus="false"
            >
              <v-card>
                <v-card-title class="headline">Are you sure?</v-card-title>

                <v-card-text>
                  This activity cannot be reversed
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="green darken-1"
                    text
                    @click="takeDialog = false"
                  >
                    No
                  </v-btn>

                  <v-btn
                    color="green darken-1"
                    text
                    @click="take(index)"
                  >
                    Yes
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-spacer></v-spacer>

            <v-btn
              icon
              @click="selectedIdx = (index === selectedIdx ? null : index) "
            >
              <v-icon>{{ selectedIdx == index ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="selectedIdx == index">
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
                    Quantity: {{ food.quantity }}
                  </v-card-subtitle>
                  </v-col>
                </v-row>
                <!-- +++++++++++++++++++++++++++++++++++++++++++++== -->
              </v-card>
            </div>
          </v-expand-transition>
        </v-card>
        <v-snackbar
          v-model="notInprogress"
        >
          Not in previous progress. Check it

          <template v-slot:action="{ attrs }">
            <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="notInprogress = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-card>
    </v-list>
  </v-container>
</template>



<script>
import http from '../../http'
export default {
  data: () => ({
    paidDialog: false,
    preparingDialog: false,
    completeDialog: false,
    takeDialog: false,
    show: null,
    ordersDetail: [],
    imgsrc: '',
    selectedIdx : null,
    notInprogress: false
  }),
  computeds : {
    findLastState(index) {
      return this.findState(index)
    }
  },
  methods : {
    findState(index) {
      return this.$store.state.orders[index].state
    },
    paid(index) {
      this.paidDialog = false
      this.preparingDialog = false
      this.completeDialog = false
      this.takeDialog = false
      console.log(index)
      if (this.findState(index) === 'unpaid') {
        let orderID = this.$store.state.orders[index].id
        http.server.get('manager/order/paid/' + orderID).then((response) => {
          if (response.statusText === "OK") {
              this.$store.state.orders[index].state = 'paid'
            }
          })
      } else {
        this.notInprogress = true
      }
    },
    prepare(index) {
      this.paidDialog = false
      this.preparingDialog = false
      this.completeDialog = false
      this.takeDialog = false
      if (this.findState(index) === 'paid') {
        http.server.get('manager/order/cook/' + this.$store.state.account.vendorID).then((response) => {
          if (response.statusText === "OK")
            this.$store.state.orders[index].state = 'preparing'
       })
      } else {
        this.notInprogress = true
      }
    },
    complete(index) {
      this.paidDialog = false
      this.preparingDialog = false
      this.completeDialog = false
      this.takeDialog = false
      if (this.findState(index) === 'preparing') {
        let orderID = this.$store.state.orders[index].id
        http.server.get('manager/order/complete/' + this.$store.state.account.vendorID + '/' + orderID).then((response) => {
          if (response.statusText === "OK")
            this.$store.state.orders[index].state = 'completed'
        })
      } else {
        this.notInprogress = true
      }
    },
    take(index) {
      this.paidDialog = false
      this.preparingDialog = false
      this.completeDialog = false
      this.takeDialog = false
      if (this.findState(index) === 'completed') {
        let orderID = this.$store.state.orders[index].id
        http.server.get('manager/order/take/' + this.$store.state.account.vendorID + '/' + orderID).then((response) => {
          console.log(response)
          if (response.statusText === "OK")
            this.$store.state.orders[index].state = 'taked'
        })
      } else {
        this.notInprogress = true
      }
    }
  },
  created() {
    if(this.$store.state.orders != []) {
      http.server.get('manager/unpaidorder/' + this.$store.state.account.vendorID)
        .then((response) => response.data)
        .then((orders) => {
          const arrOrders = Object.keys(orders).map(i => Object.assign({}, {'id': i}, orders[i]))
          arrOrders.forEach((item) => {
            let listFoods = []
            item.cartItems.forEach(item => {
              let index = this.$store.state.foods.findIndex((element) => element.id == item.foodID)
              if (index > -1) {
                listFoods.push(this.$store.state.foods[index])
              }
            })
            if (listFoods.length > 0) {
              this.ordersDetail.push(listFoods)
              this.$store.commit('pushOrderItem', item)
            }
          })
        })
    }
  },
}
</script>