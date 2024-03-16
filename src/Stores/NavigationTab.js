import { defineStore } from 'pinia'

export const useNavigationTabStore = defineStore('navigationTab', {
    state: () => ({
        activeTab:'dashboard',
        tabRightInfo:{
            customerListRightInfoMaxWidth:'800px',
            customerCardRightInfoMaxWidth:'800px',
            itemListRightInfoMaxWidth:'800px',
            itemCardRightInfoMaxWidth:'800px',
            contactListRightInfoMaxWidth:'800px',
            contactCardRightInfoMaxWidth:'800px',
            leadListRightInfoMaxWidth:'800px',
            leadCardRightInfoMaxWidth:'800px',
            newquoteRightInfoMaxWidth:'800px',
            newOrderRightInfoMaxWidth:'800px',
            quoteListRightInfoMaxWidth:'800px',
            quoteCardRightInfoMaxWidth:'800px',
            orderListRightInfoMaxWidth:'800px',
            orderCardRightInfoMaxWidth:'800px',
        },
        presentationForPageList:{
            customerListPresentation:'list',
            itemListPresentation:'list',
            contactListPresentation:'list',
            leadListPresentation:'list',
            quoteListPresentation:'list',
            orderListPresentation:'list',
       }
    }),
    // getters: {
    //   getActiveTab: (state) => state.activeTab,
    // },
    actions: {
      setActiveTab(tab) {
        this.activeTab = tab
      },
      setMaxWidth(property,value) {
          this.tabRightInfo[`${property}`] = value
      },
      setPresentation(property,presentation) {
          this.presentationForPageList[`${property}`] = presentation
      }
    },
  })