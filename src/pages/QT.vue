<script setup lang="ts">
import { fasPrayingHands } from '@quasar/extras/fontawesome-v5';
</script>
<template>
  <q-page style="padding-top: 50px; width: 100%; height: 100vh; overflow">
    <q-page-sticky expand position="top" style="z-index: 999">
      <q-toolbar class="bg-primary text-white" style="border: 1px solid">
        <q-avatar>
          <q-icon :name="fasPrayingHands" />
        </q-avatar>
        <q-toolbar-title class="q-pa-xs"> Q.T </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-page-sticky>
    <iframe
      style="border: 0px; width: 100%; height: 100vh"
      src="https://sum.su.or.kr:8888/bible/today"
    ></iframe>
  </q-page>
</template>
