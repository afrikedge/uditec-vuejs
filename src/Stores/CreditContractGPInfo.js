import { defineStore } from 'pinia'

export const useCreditContractGPInfoStore = defineStore('creditContractGP', {
    state: () => ({
        isFilled:false,
        eligibleItem:0,
        durationMonth:0,
        OPDurationMonth:0,
        transferablePart:0,
        discountsAllowed:0,
        salesMinimumValue:0,
        salesMode:'AGP',
        numberOfBeneficiary:0,
        siteVisitRequired:0,
        employeeContractType:0,
        minimunRevenu:0,
        applicationFees:0,
        applicationFeesCondition:0,
        bankableEmployee:0,
        applicationFeesItem:'',
        defaultPaymentTermsCode:''
    }),
    getters: {
        getCreditContractGP: (state) => state,
    },
    actions: {
        fillCreditContractGPInfo(AGP) {
            this.isFilled=true
            this.eligibleItem=AGP['Eligible Item'],
            this.durationMonth=AGP['Duration (Month)'],
            this.OPDurationMonth=AGP['OP Duration (Month)'],
            this.transferablePart=AGP['Transferable part _'],
            this.discountsAllowed=AGP['Discounts allowed'],
            this.salesMinimumValue=AGP['Sales minimum value'],
            this.salesMode=AGP['Sales Mode'],
            this.numberOfBeneficiary=AGP['Number of Beneficiary'],
            this.siteVisitRequired=AGP['Site vite required'],
            this.employeeContractType=AGP['Employee Contract Type'],
            this.minimunRevenu=AGP['Minimun revenu'],
            this.applicationFees=AGP['Application fees'],
            this.applicationFeesCondition=AGP['Application fees condition'],
            this.bankableEmployee=AGP['Bankable Employee'],
            this.applicationFeesItem=AGP['Application fees Item']
            this.defaultPaymentTermsCode=AGP['AGP Payment Terms Code']
        },
    },
  })