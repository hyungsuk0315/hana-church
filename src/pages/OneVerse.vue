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
import { onMounted, ref } from 'vue';
import StreamListItem from 'src/components/StreamListItem.vue';
import { fasDiceOne } from '@quasar/extras/fontawesome-v5';

const items = ref<QueryDocumentSnapshot<DocumentData>[]>([]);

const getData = async () => {
  let q;
  q = query(collection(db, 'streams'), where('tag', '==', 'OneVerse'));
  const querySnapshot = await getDocs(q);
  items.value = querySnapshot.docs;

  // sort by latest order
  items.value = items.value.sort(
    (a, b) => (a.data().date < b.data().date && 1) || -1
  );

  for (var i = 0; i < items.value.length; i++)
    console.log('[Debug]', items.value[i].data());
};

onMounted(() => getData());
</script>
<template>
  <q-page style="padding-top: 50px; width: 100%; height: 100vh; overflow">
    <q-page-sticky expand position="top" style="z-index: 999">
      <q-toolbar class="bg-primary text-white" style="border: 1px solid">
        <q-avatar>
          <q-icon :name="fasDiceOne" />
        </q-avatar>
        <q-toolbar-title class="q-pa-xs"> ONE VERSE </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-page-sticky>
    <div class="row q-pa-md">
      <StreamListItem
        class="q-pa-md col-xs-6 col-sm-4 col-lg-3 col-xl-2"
        :item="item"
        v-for="(item, key) in items"
        :key="key"
      />
    </div>
  </q-page>
</template>
