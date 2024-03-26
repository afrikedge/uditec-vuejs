<template>
       
    <div class="field is-horizontal ">
        <div class="field-label  is-normal" style="margin: 0;" >
            <label class="label has-text-grey has-text-left" style="width:170px" > <span class="subtitle is-6">{{ props.labelInputText }}</span>   </label>
        </div>.....................
        <div class="field-body" >
            <div class="field">
                <div class="control is-expanded">
                    <input :disabled="props.is_disabled" :class="['input',props.inputTextColor,props.inputTextWeight]" type="text has-text-dark" :value="props.valueInputText" v-if="props.is_disabled==true">
                    
                    <div class="field has-addons " v-else>
                        <div class="control is-expanded">
                            <input class="input" type="text" v-model="model" readonly>
                        </div>
                        <div class="control">
                            <a class="button is-light" @click.prevent="$emit('openModal',model)">
                            ...
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineModel } from 'vue';
const props = defineProps(['labelInputText','valueInputText','is_disabled','inputTextColor','inputTextWeight'])
const model = defineModel()

</script>

