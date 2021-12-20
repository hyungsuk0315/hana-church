<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'App',
  setup(){
    const $q = useQuasar()

    // calling here; equivalent to when component is created
    $q.dark.set(false)
  }
});
</script>
<style>
body {
  font-family: 'Nanum Gothic', sans-serif;
  background-color: #F0F0F0;
}
</style>
