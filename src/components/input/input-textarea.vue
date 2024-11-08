<template>
       
    <div class="field is-horizontal ">
        <div class="field-label  is-normal" style="margin: 0;" >
            <label class="label has-text-grey has-text-left" style="width:170px" > <span class="subtitle is-6">{{ props.labelInputText }}</span>   </label>
        </div>.....................
        <div class="field-body" >
            <div class="field">
                <p :class="{'control':true,'is-expanded':true,'is-loading':is_loading}">
                    <textarea class="textarea" rows="5" style="resize:none;"  :disabled="props.is_disabled" v-model="model" v-if="props.is_disabled==true">
                    </textarea>
                    <textarea class="textarea" rows="5" v-model="model" v-else>
                    </textarea>    
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineModel, defineProps } from 'vue';
const model = defineModel()
const props = defineProps(['labelInputText','valueInputText','is_disabled','is_readOnly','inputTextColor','inputTextWeight','is_loading','maxLength'])

</script>

