import { defineStore } from 'pinia'

export const useWebUserInfoStore = defineStore('webUser', {
    state: () => ({ name:'Gerald',responsibilityCenter:'PARIS ',activeCompanyId:'b9643631-44bc-ee11-9080-6045bdc8c195'}),
    getters: {
      getWebUser: (state) => state.activeTab,
    },
    // actions: {
    //   setActiveTab(tab) {
    //     this.activeTab = tab
    //   },
    // },
  })