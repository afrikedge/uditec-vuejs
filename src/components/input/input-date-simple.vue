<template>
    <div class="field is-horizontal ">
        <div class="field-body" >
            <div class="field">
                <p :class="{'control':true,'is-expanded':true}">
                    <input class="input " type="date" v-model="model">
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineModel } from 'vue';
const model = defineModel()

</script>

