import { defineStore } from 'pinia'

export const useWebUserInfoStore = defineStore('webUser', {
    state: () => ({ name:'Gerald',responsibilityCenter:'PARIS'}),
    getters: {
      getWebUser: (state) => state.activeTab,
    },
    // actions: {
    //   setActiveTab(tab) {
    //     this.activeTab = tab
    //   },
    // },
  })