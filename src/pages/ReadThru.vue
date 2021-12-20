<script setup lang="ts">
import {ref} from 'vue';
const date = ref('2021/12/14');
</script>
<template>
  <div class="q-pa-md">
      <div id='head'>
        <q-toolbar-title>하나 통독</q-toolbar-title>
        <q-date v-model='date' minimal />
      </div>
  </div>
</template>
