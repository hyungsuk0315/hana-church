<script setup lang="ts">
import JoyChantPlayList from 'src/components/JoyChantPlayList.vue';
import { db } from 'boot/firebase';
import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { onMounted, onUpdated, ref } from 'vue';
import { fasGrinStars } from '@quasar/extras/fontawesome-v5';

const items = ref<QueryDocumentSnapshot<DocumentData>[]>([]);

const getData = async () => {
  let q = query(collection(db, 'joy-chant'));
  const querySnapshot = await getDocs(q);
  items.value = querySnapshot.docs;

  // sort by latest order
  items.value = items.value.sort(
    (a, b) => (a.data().order > b.data().order && 1) || -1
  );
};

onMounted(() => getData());
onUpdated(() => getData());
</script>
<template>
  <q-page style="padding-top: 66px; width: 100%; height: 100vh; overflow">
    <q-page-sticky expand position="top" style="z-index: 999">
      <q-toolbar class="bg-primary text-white" style="border: 1px solid">
        <q-avatar>
          <q-icon :name="fasGrinStars" />
        </q-avatar>
        <q-toolbar-title class="q-pa-xs"> 조이챈트 </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-page-sticky>
    <div v-for="(item, i) in items" :key="i">
      <JoyChantPlayList
        :playlistName="item.data().playlistName"
        :key="item.data().playlistName"
      />
    </div>
  </q-page>
</template>
