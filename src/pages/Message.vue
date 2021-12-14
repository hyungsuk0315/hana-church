<script setup lang="ts">
import PlayList from 'src/components/PlayList.vue';
import { db } from 'boot/firebase';
import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  DocumentData,
  where,
} from 'firebase/firestore';
import { onMounted, ref, defineProps, onUpdated } from 'vue';

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
  <q-page>
    <div>hi</div>
    <!-- {{ tagList[props.tag] }} -->

      <div v-for="(item, i) in items" :key="i">
        <div :key="i">
          {{item.data().playlistName}}
        </div>
        <PlayList :tag="item.data().playlistName" :key="item.data().playlistName"/>
        </div>
      <!-- <div update :key='props.tag'>{{item}}</div> -->
      <!-- <StreamList :tag="props.tag" :key="props.tag" /> -->
  </q-page>
</template>
