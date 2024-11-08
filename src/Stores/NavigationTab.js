import { defineStore } from 'pinia'

export const useNavigationTabStore = defineStore('navigationTab', {
    state: () => ({
        activeGroup:'sales',
        activeTab:'dashboard',
        tabRightInfo:{
            customerListRightInfoMaxWidth:'0px',
            customerCardRightInfoMaxWidth:'0px',
            itemListRightInfoMaxWidth:'0px',
            itemCardRightInfoMaxWidth:'0px',
            contactListRightInfoMaxWidth:'0px',
            contactCardRightInfoMaxWidth:'0px',
            creditRequestListRightInfoMaxWidth:'0px',
            creditRequestCardRightInfoMaxWidth:'0px',
            creditContractListRightInfoMaxWidth:'0px',
            creditContractCardRightInfoMaxWidth:'0px',
            leadListRightInfoMaxWidth:'0px',
            leadCardRightInfoMaxWidth:'0px',
            newLeadRightInfoMaxWidth:'0px',
            newquoteRightInfoMaxWidth:'0px',
            newOrderRightInfoMaxWidth:'0px',
            newrepossRightInfoMaxWidth:'0px',
            newPayPromiseRightInfoMaxWidth:'0px',
            newRecoveryActivityRightInfoMaxWidth:'0px',
            newCreditRequestRightInfoMaxWidth:'0px',
            newCreditContractRightInfoMaxWidth:'0px',

            quoteListRightInfoMaxWidth:'0px',
            quoteCardRightInfoMaxWidth:'0px',
            orderListRightInfoMaxWidth:'0px',
            orderCardRightInfoMaxWidth:'0px',
            
            paymentPromiseRightInfoMaxWidth:'0px',
            repossRequestRightInfoMaxWidth:'0px',
            assignedDebtRightInfoMaxWidth:'0px',
            recoveryActivityListRightInfoMaxWidth:'0px',
            recoveryActivityCardRightInfoMaxWidth:'0px',
            assignedCustomerListRightInfoMaxWidth:'0px',
            assignedCustomerCardRightInfoMaxWidth:'0px',
        },
        presentationForPageList:{
            customerListPresentation:'list',
            itemListPresentation:'list',
            contactListPresentation:'list',
            creditRequestListPresentation:'list',
            creditContractListPresentation:'list',
            leadListPresentation:'list',
            quoteListPresentation:'list',
            orderListPresentation:'list',

            repossRequestListPresentation:'list',
            assignedDebtListPresentation:'list',
            paymentPromiseListPresentation:'list',
            recoveryActivityListPresentation:'list',
            assignedCustomerListPresentation:'list',
       }
    }),
    // getters: {
    //   getActiveTab: (state) => state.activeTab,
    // },
    actions: {
        setActiveTab(tab) {
            this.activeTab = tab
        },
        setActiveGroup(group)  {
            this.activeGroup = group
        },
        setMaxWidth(property,value) {
            this.tabRightInfo[`${property}`] = value
        },
        setPresentation(property,presentation) {
            this.presentationForPageList[`${property}`] = presentation
        }
    },
  })