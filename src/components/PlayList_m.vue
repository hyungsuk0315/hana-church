<script setup lang="ts">
import PlayListItem_m from 'src/components/PlayListItem_m.vue';
import { db } from 'boot/firebase';
import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  DocumentData,
  where,
} from 'firebase/firestore';
import { onMounted, ref, defineProps } from 'vue';

const props = defineProps<{
  tag: string;
}>();

const items = ref<QueryDocumentSnapshot<DocumentData>[]>([]);

const item = ref<QueryDocumentSnapshot<DocumentData>>();

const getData = async () => {
  let q;
  if (props.tag) {
    q = query(collection(db, 'streams'), where('playlistName', '==', props.tag));
  } else {
    q = query(collection(db, 'streams'));
  }
  const querySnapshot = await getDocs(q);
  items.value = querySnapshot.docs;
  item.value = items.value[0];
  console.log('items ', items.value[0]);
};


onMounted(() => getData());

</script>
<template>
  <div class="q-pb-lg">
    <div v-for="(item , i ) in items.slice(0,1) " :key="i">
      <PlayListItem_m  :item="item" :len="items.length" /> 
    </div>
  </div>
</template>

<style>
q-card{
  display:flex
}
</style>