<template>
  <div :class="{ modal: true, 'is-active': true }">
    <div
      class="modal-background has-background-white"
      style="opacity: 0.7"
    ></div>
    <div
      id="scrollBlock"
      class="modal-card box shadow is-rounded h-100 has-background-light"
      style="width: 96%; padding: 0"
    >
      <!---------Composant entête liste contacts----------------------->
      <div id="card-header-comp" class="has-background-white py-5">
        <ContactListHeader class="w-100 mx-2" pageTitle="Fiche contact" />
      </div>
      
      <!---------Composant rubban liste contacts----------------------->
      <div id="card-ribbon-comp" class="mt-3 mx-5">
        <contact-list-ribbon
          class="mx-5"
          pageTitle="Contacts"
          :newCardBtnDisabled="true"
          :editCardBtnDisabled="true"
          :readOnlyModeDisabled="true"
        ></contact-list-ribbon>
      </div>

      <!---------Section liste des contacts----------------------->
      <div class="has-background-light mt-5" style="overflow-y: scroll">
        <div
          class="column mt-5"
          id="customer-column"
          style="overflow-y: scroll"
          v-if="true"
        >
          <table class="table is-narrow is-hoverable is-fullwidth">
            <thead class="my-2">
              <tr>
                <th
                  class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"
                  style="min-width: 100px"  >No
                </th>
                <th
                  class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"
                  style="min-width: 100px" >Code client
                </th>
                <th
                  class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"
                  style="min-width: 100px"
                >
                Titre
                </th>
                <th
                  class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"
                  style="min-width: 100px"
                >
                Prénom
                </th>
                <th
                  class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7" style="min-width: 100px"> Autre nom
                </th>
                <th
                  class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"
                  style="min-width: 100px">Nom
                </th>
                <th
                  class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"
                  style="min-width: 100px">Nom complet
                </th>

                <th
                class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"
                style="min-width: 100px" > Adresse : Ligne 1
              </th>
              <th
              class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"
              style="min-width: 100px"> Adresse : Ligne 2
            </th>

            <th
            class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"
            style="min-width: 100px">Code Postal
          </th>
            <th
            class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"
            style="min-width: 100px">Ville
          </th>

            <th
            class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"
            style="min-width: 100px"> Téléphone </th>

            <th
            class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"
            style="min-width: 100px"> Téléphone Mobile </th>

            <th
            class="has-background-light has-text-grey has-text-left has-text-weight-normal is-size-7"
            style="min-width: 100px">Fonction </th>
            
              </tr>
            </thead>
            <tbody>
              <tr v-for="contact in contactList" :key="contact['No_']">
                <td class="has-text-left has-background-light">
                  <router-link
                    :to="`/ContactCard/${contact['Customer No_']}/${contact['No_']}`"
                  >
                    <a href="#" class="has-text-orange">
                      {{ contact["No_"] }}
                    </a>
                  </router-link>
                </td>

                <td class="has-text-left has-background-light">
                  {{ contact["Customer No_"] }}
                </td>
                <td class="has-text-left has-background-light">
                  {{ contact["Salutation Code"] }}
                </td>
                <td class="has-text-left has-background-light">
                  {{ contact["First Name"] }}
                </td>
                <td class="has-text-left has-background-light">
                  {{ contact["Middle Name"] }}
                </td>
                <td class="has-text-left has-background-light">
                  {{ contact["Surname"] }}
                </td>
                <td class="has-text-left has-background-light">
                  {{ contact["Name"] }}
                </td>
                <td class="has-text-left has-background-light">
                  {{ contact["Address"] }}
                </td>
                <td class="has-text-left has-background-light">
                  {{ contact["Address 2"] }}
                </td>
                
                <td class="has-text-left has-background-light">
                  {{ contact["Post Code"] }}
                </td>

                <td class="has-text-left has-background-light">
                  {{ contact["City"] }}
                </td>
                <td class="has-text-left has-background-light">
                  {{ contact["Phone No_"] }}
                </td>
                <td class="has-text-left has-background-light">
                  {{ contact["Mobile Phone No"] }}
                </td>
                <td class="has-text-left has-background-light">
                  {{ contact["Job Title"] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="column" v-if="false">
          <div class="columns is-multiline">
            <div
              class="column is-3"
              id=""
              v-for="contact of contactList"
              :key="contact['No_']"
            >
              <div class="columns p-1 card-is-hoverable">
                <div class="column is-narrow has-background-white">
                  <figure class="image is-64x64">
                    <img
                      class="is-rounded"
                      :src="require(`@/assets/images/gerald1.jpg`)"
                    />
                  </figure>
                </div>
                <div class="column has-background-white card-is-hoverable">
                  <p class="has-text-left">
                    <span class="is-size-7 has-text-grey has-background-light">
                      <router-link
                        :to="`/ContactCard/${contact['Customer No_']}/${contact['No_']}}`"
                      >
                        <a href="#" class="has-text-orange">
                          {{ contact["No_"] }}
                        </a>
                      </router-link>
                    </span>
                  </p>
                  <div class="has-text-left columns">
                    <div class="column has-text-left has-text-orange py-0 mt-1">
                      <span class="is-size-7 is-underlined">{{
                        contact["Name"]
                      }}</span>
                    </div>
                    <div class="column has-text-right is-narrow py-0 mt-1">
                      <span class="is-size-7">{{ contact["City"] }}</span>
                    </div>
                  </div>
                  <div class="has-text-left columns">
                    <div class="column has-text-left py-0">
                      <span class="is-size-7">{{ contact["Customer No_"] }}</span>
                    </div>
                    <div class="column has-text-right is-narrow py-0">
                      <span class="is-size-7">{{ contact["Salutation Code"] }}</span>
                    </div>
                  </div>
                </div>
                <a class="column is-narrow has-background-orange is-flex">
                  <span class="is-align-self-center has-text-white">...</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="column" v-if="false">
          <div class="columns is-multiline is-gapless">
            <div
              class="column is-2 p-2"
              v-for="contact of contactList"
              :key="contact['No_']"
            >
              <div class="has-background-white m-1">
                <div class="card-is-hoverable box">
                  <div class="">
                    <div class="has-text-left">
                      <a href="#">
                        <span class="py-0">...</span>
                      </a>
                    </div>
                    <div class="is-flex is-justify-content-center">
                      <figure class="image is-128x128">
                        <img
                          class="is-rounded"
                          :src="require(`@/assets/images/gerald1.jpg`)"
                        />
                      </figure>
                    </div>
                    <hr class="rounded" />
                    <div class="">
                      <p class="has-text-left">
                        <span
                          class="is-size-7 has-text-grey has-background-light"
                        >
                          <router-link
                            :to="`/ContactCard/${contact['Customer No_']}/${contact['No_']}`"
                          >
                            <a href="#" class="has-text-orange">
                              {{ contact["No_"] }}
                            </a>
                          </router-link>
                        </span>
                      </p>
                      <div class="has-text-left columns">
                        <div
                          class="column has-text-left has-text-orange py-0 mt-1"
                        >
                          <span class="is-size-7 is-underlined">{{
                            contact["Name"]
                          }}</span>
                        </div>
                        <div class="column has-text-right is-narrow py-0 mt-1">
                          <span class="is-size-7">{{ contact["City"] }}</span>
                        </div>
                      </div>
                      <div class="has-text-left columns">
                        <div class="column has-text-left py-0">
                          <span class="is-size-7">
                            {{ contact["Customer No_"] }}</span
                          >
                        </div>
                        <div class="column has-text-right is-narrow py-0">
                          <span class="is-size-7">{{ contact["Salutation Code"] }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ContactListRibbon from "./RibbonForLists.vue";
import ContactListHeader from "./HeaderForList.vue";
import axios from "axios";
import { ref } from "vue";
export default {
  name: "contact-list",
  components: {
    ContactListRibbon,
    ContactListHeader,
  },
  data() {
    return {
      custumerId: this.$route.params.id,
    };
  },
  setup() {
    const contactList = ref([]);

    // expose to template and other options API hooks
    return {
      contactList,
    };
  },

  mounted() {
    axios
      .get(`http://108.175.0.116:3000/app/getContactList/${this.custumerId}`)
      .then((result) => {
        this.contactList = result.data.recordset;
        //console.log(result.data.recordset);
      })
      .catch((err) => console.error(err));
  },
};
</script>
