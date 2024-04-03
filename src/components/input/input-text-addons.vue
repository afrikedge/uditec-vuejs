<template>
       
    <div class="field is-horizontal ">
        <div class="field-label  is-normal" style="margin: 0;" >
            <label class="label has-text-grey has-text-left" style="width:120px" > <span class="subtitle is-6">{{ props.labelInputText }}</span>   </label>
        </div>.....................
        <div class="field-body" >
            <div class="field">
                <div class="control">
                    <div class="field has-addons">
                        <div class="control ">
                            <input class="input" type="text" :value="props.valueInputText1" readonly>
                        </div>
                        <div class="control ">
                            <input class="input" type="text" :value="props.valueInputText2" readonly>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps(['labelInputText','valueInputText1','valueInputText2','inputTextColor','inputTextWeight'])

</script>

