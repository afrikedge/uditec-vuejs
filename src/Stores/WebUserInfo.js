import { defineStore } from 'pinia'

export const useWebUserInfoStore = defineStore('webUser', {
    state: () => ({ name:'',
        responsibilityCenter:'',
        activeCompanyId:'',
        defaultCustomerNo:'',
        defaultCustomerName:'',

        defaultLanguage:'FRA',

        defaultCustomerContactCode:'',
        defaultCustomerPaymentMethodCode:'',
        defaultCustomerPaymentTermsCode:'',
        defaultCustomerPrepayment:0,
        defaultCustomerShipmentMethodCode:'',
        defaulCustomerPostingGroup:'',
        defaultCustomerGenBusPostingGroup:'',
        defaultCustomerVATBusPostingGroup:'',
        defaultCustomerPriceGroup:'',
        defaultCustomerShipToCode:'',
        defaultCustomerSalesMode:'',


        defaultLocation:'',
        defaultSalesPersonCode:'',
        defaultSalesChannel:'',
        defaultStoreCode:''
      }),
    getters: {
      getWebUser: (state) => state
    },
    actions: {
      fillWebUserInfo(data) {
        this.name=data["Code"]
        this.responsibilityCenter=data["Responsibility Center"]
        this.activeCompanyId=data["Default Company Id"]
        this.defaultCustomerName=data["Default Customer Name"]
        this.defaultCustomerNo= data["Default Customer No_"]
        this.defaultLocation=data["Location"]
        this.defaultSalesPersonCode=data["Sales Person Code"]
        this.defaultSalesChannel=data["Sales Channel"]
        this.defaultStoreCode=data["Store Code"]
      },
      fillWebUserCustomerInfo(customer){
        this.defaultCustomerContactCode=customer['Primary Contact No_']
        this.defaultCustomerPaymentMethodCode=customer['Payment Method Code']
        this.defaultCustomerPaymentTermsCode=customer['Payment Terms Code']
        this.defaultCustomerPrepayment=customer['Prepayment _']
        this.defaultCustomerShipmentMethodCode=customer['Shipment Method Code']
        this.defaulCustomerPostingGroup=customer['Customer Posting Group']
        this.defaultCustomerGenBusPostingGroup=customer['Gen_ Bus_ Posting Group']
        this.defaultCustomerVATBusPostingGroup=customer['VAT Bus_ Posting Group']
        this.defaultCustomerPriceGroup=customer['Customer Price Group']
        this.defaultCustomerShipToCode=customer['Ship-to Code']
        this.defaultCustomerSalesMode=customer['Sales Mode']
      }
    },
  })