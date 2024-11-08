<template>
    <div class="field is-horizontal ">
        <div class="field-body" >
            <div class="field">
                <p :class="{'control':true,'is-expanded':true}">
                    <input class="input " type="text" v-model="model" :placeholder="props.inputPlaceHolder">
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineModel } from 'vue';
import { defineProps } from 'vue';
const model = defineModel()
const props = defineProps(['inputPlaceHolder'])

</script>

