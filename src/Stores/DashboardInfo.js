import { defineStore } from 'pinia'
import {ref} from 'vue'
//import axios from 'axios'

export const useDashboardInfoStore = defineStore('dashboardInfo', {
    state: () => ({
        quoteList:[],
        quoteListLength:0,
        orderList:[],
        orderListLength:0


    }),
    getters: {
        getOpenedQuoteList: (state) => {
            return state.quoteList.filter((row) => row['Status']==1)
        }
    },
    actions: {
        fillQuoteList(respCentr) {
            //axios.get
        },
    },
  })