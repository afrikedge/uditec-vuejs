import { defineStore } from 'pinia'

export const useWebUserInfoStore = defineStore('webUser', {
    state: () => ({ name:'Gerald',responsibilityCenter:'CENTRE TEST1'}),
    getters: {
      getWebUser: (state) => state.activeTab,
    },
    // actions: {
    //   setActiveTab(tab) {
    //     this.activeTab = tab
    //   },
    // },
  })