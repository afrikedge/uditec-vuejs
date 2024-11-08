import { defineStore } from 'pinia'

export const useSPT2NavigationTabStore = defineStore('navigationTab', {
    state: () => ({
        activeTab:'saleOrder',
        activeCustomerCode:'',
        activeCustomerName:'',
        activeContactCode:'',
        activeContactName:'',
        activeSalesOrder:''
    }),
    // getters: {
    //   getActiveTab: (state) => state.activeTab,
    // },
    actions: {
      setActiveTab(tab) {
        this.activeTab = tab
      },
      setActiveSalesOrder(no) {
        this.activeSalesOrder = no
      },
      setActiveContact(code,name){
          this.activeContactCode = code
          this.activeContactName = name
      },
      setActiveCustomer(code,name){
          this.activeCustomerCode = code
          this.activeCustomerName = name
      }
    },
  })