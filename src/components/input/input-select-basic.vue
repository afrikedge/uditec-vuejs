<template>
       
    <div class="field is-horizontal ">
        <div class="field-label  is-normal" style="margin: 0;" >
            <label class="label has-text-grey has-text-left" style="width:170px" > <span class="subtitle is-6">{{ props.labelInputText }}</span>   </label>
        </div>.....................
        <div class="field-body" >
            <div class="field">
                <div class="control is-expanded is-fullwidth">
                    <div class="select is-expanded is-fullwidth">
                      <select  v-model="model" class="control is-expanded is-fullwidth">
                        <option class="has-text-left" value="2">             Article</option>
                        <option class="has-text-left" value="0">Commentaire</option>
                      </select>
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

