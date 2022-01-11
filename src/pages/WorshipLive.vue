<script setup lang="ts">
import { db } from 'boot/firebase';
import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  DocumentData,
  where,
} from 'firebase/firestore';
import { onMounted, onUpdated, ref } from 'vue';
import StreamListItem from 'src/components/StreamListItem.vue';
import { fasVideo } from '@quasar/extras/fontawesome-v5';
import { useQuasar } from 'quasar';
const $q = useQuasar();
const items = ref<QueryDocumentSnapshot<DocumentData>[]>([]);
const slide = ref(0);

const getData = async () => {
  let today = new Date();
  let todayString =
    today.getFullYear().toString() +
    '/' +
    (today.getMonth() + 1 < 10 ? '0' : '') +
    (today.getMonth() + 1).toString() +
    '/' +
    (today.getDate() < 10 ? '0' : '') +
    today.getDate().toString();
  let q;
  console.log(`today: ${todayString}`);
  q = query(collection(db, 'streams'), where('date', '==', todayString));
  const querySnapshot = await getDocs(q);
  items.value = querySnapshot.docs;
  for (var i = 0; i < items.value.length; i++)
    console.log('[Debug]', items.value[i].data());
};

onMounted(() => getData());

onUpdated(() => getData());
</script>
<template>
  <q-page
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
    style="padding-top: 50px; width: 100%; height: 90vh"
  >
    <q-page-sticky expand position="top" style="z-index: 999">
      <q-toolbar class="bg-primary text-white" style="border: 1px solid">
        <q-avatar>
          <q-icon :name="fasVideo" />
        </q-avatar>
        <q-toolbar-title class="q-pa-xs"> 예배 LIVE </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-page-sticky>
    <div class="q-pa-none">
      <q-carousel
        v-model="slide"
        swipeable
        animated
        :control-type="controlType"
        control-color="primary"
        navigation
        padding
        arrows
        height="90vh"
        class="rounded-borders"
      >
        <q-carousel-slide
          :name="key"
          v-for="(item, key) in items"
          :key="key"
          class="column no-wrap flex-center"
        >
          <StreamListItem :item="item" imgStyle="width:711px; height:400px" />
        </q-carousel-slide>
      </q-carousel>
    </div>
  </q-page>
</template>
