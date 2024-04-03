import { defineStore } from 'pinia'

export const useMirindraGPInfoStore = defineStore('mirindraGP', {
    state: () => ({
        isFilled:false,
        eligibleItem:0,
        eligibleCustomer:0,
        maximumCreditDuration:0,
        requiredDeposit:0,
        monthlyInterestRate:0,
        NoOfCumulativeCredit:0,
        NoOfProductsPerFile:0,
        siteVisitRequired:0,
        eligibilityArea:0,
        salesMinimumValue:0,
        applicationFees:0,
        discountsAllowed:0,
        roundingRule:0,
        itemForInterest:'',
        salesMode:'',
        itemForApplicationFees:'',
        paymentTermsCode:'' 
    }),
    getters: {
        getMirindraGP: (state) => state,
    },
    actions: {
        fillMirindraGPInfo(MGP) {
            this.isFilled=true
            this.eligibleItem=MGP['Eligible Item']
            this.eligibleCustomer=MGP['Eligible Customer']
            this.maximumCreditDuration=MGP['Maximum credit duration']
            this.requiredDeposit=MGP['Required Deposit']
            this.monthlyInterestRate=MGP['Monthly interest rate']
            this.NoOfCumulativeCredit=MGP['No of cumulative credits']
            this.NoOfProductsPerFile=MGP['No of products per file']
            this.siteVisitRequired=MGP['Site visit required']
            this.eligibilityArea=MGP['Eligibility area']
            this.salesMinimumValue=MGP['Sales minimum value']
            this.applicationFees=MGP['Application fees']
            this.discountsAllowed=MGP['Discounts allowed']
            this.roundingRule=MGP['Rounding rule']
            this.itemForInterest=MGP['Item for interest']
            this.salesMode=MGP['Sales Mode']
            this.itemForApplicationFees=MGP['Item for application fees']
            this.paymentTermsCode=MGP['Payment Terms Code'] 
        },
    },
  })