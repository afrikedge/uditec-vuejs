<template>
       
    <div class="field is-horizontal ">
        <div class="field-label is-expanded is-normal">
            <label class="label has-text-grey has-text-left is-size-7 is-narrow" >  {{ labelInputText }} </label>
        </div>
        <div class="field-body">
            <div class="field">
                <p class="control">
                    <input :disabled="props.is_disabled" class="input " type="text has-text-dark" :value="props.valueInputText" v-if="props.is_disabled==true">
                    <input :disabled="props.is_disabled" class="input " type="text has-text-dark" v-model="model" v-else>
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps,defineModel } from 'vue';
const model = defineModel()
const props = defineProps(['labelInputText','valueInputText','is_disabled','inputTextColor','inputTextWeight'])

</script>