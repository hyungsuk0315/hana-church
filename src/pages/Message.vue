<script setup lang="ts">
import PlayList from 'src/components/PlayList.vue';
import { db } from 'boot/firebase';
import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { onMounted, onUpdated, ref, defineProps } from 'vue';
import { fasPlayCircle } from '@quasar/extras/fontawesome-v5';

const props = defineProps<{
  tag: string;
}>();

const items = ref<QueryDocumentSnapshot<DocumentData>[]>([]);

const getData = async () => {
  let q;
  if (props.tag) {
    q = query(collection(db, props.tag));
  } else {
    q = query(collection(db, 'streams'));
  }

  const querySnapshot = await getDocs(q);
  items.value = querySnapshot.docs;

  // sort by latest order
  items.value = items.value.sort(
    (a, b) => (a.data().date < b.data().date && 1) || -1
  );
  console.log('[Debug]', items.value[0]);
};
onMounted(() => getData());
onUpdated(() => getData());
</script>
<template>
  <q-page style="padding-top: 66px; width: 100%; height: 100vh; overflow">
    <q-page-sticky expand position="top" style="z-index: 999">
      <q-toolbar class="bg-primary text-white" style="border: 1px solid">
        <q-avatar>
          <q-icon :name="fasPlayCircle" />
        </q-avatar>
        <q-toolbar-title class="q-pa-xs"> {{ props.tag }} </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-page-sticky>
    <q-intersection v-for="(item, i) in items" :key="i" transition="scale">
      <PlayList
        :tag="item.data().playlistName"
        :key="item.data().playlistName"
      />
    </q-intersection>
  </q-page>
</template>
