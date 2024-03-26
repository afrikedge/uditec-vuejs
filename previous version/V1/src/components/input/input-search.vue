<template>
    <div class="field">
      <p class="control is-expanded has-icons-left">
        <input v-model="model" class="input is-small" type="text" placeholder="Rechercher">
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    
</template>

<script setup>
import { defineModel } from 'vue';
const model = defineModel()

</script>

