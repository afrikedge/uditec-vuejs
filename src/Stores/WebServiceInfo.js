import { defineStore } from 'pinia'

export const useWebServiceInfoStore = defineStore('webService', {

    state: () => ({ name:'108.175.0.116\\webservices',password:'Afrikedge@2003'}),
    getters: {
      getWebServiceName: (state) => state.name,
      getWebServicePswd: (state) => state.password,
    },
    // actions: {
    //   setActiveTab(tab) {
    //     this.activeTab = tab
    //   },
    // },
  })