<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

const props = defineProps<{
  item: QueryDocumentSnapshot<DocumentData>;
}>();
const stream = computed(() => props.item.data());
</script>
<template>
  <q-padding class="q-py-md">
    <q-card class="my-card">
      <q-video :ratio="16 / 9" :src="stream.url" />
      <q-card-section>
        <div class="text-h6">{{ stream.title }}</div>
        <!-- <div class="text-subtitle2">{{ stream.tag }}</div> -->
        <div class="text-subtitle2">{{ stream.date }}</div>
      </q-card-section>
    </q-card>
  </q-padding>
</template>
