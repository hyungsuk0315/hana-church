<script setup lang="ts">
import StreamListItem from 'src/components/StreamListItem.vue';
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
  tag: { type: string };
}>();

const items = ref<QueryDocumentSnapshot<DocumentData>[]>([]);

const getData = async () => {
  let q;
  if (props.tag) {
    q = query(collection(db, 'streams'), where('playlistName', '==', props.tag));
  } else {
    q = query(collection(db, 'streams'));
  }
  console.log('props.tag -' , props.tag)
  const querySnapshot = await getDocs(q);
  items.value = querySnapshot.docs;

  // sort by latest order
  items.value = items.value.sort(
    (a, b) => (a.data().date < b.data().date && 1) || -1
  );
};
onMounted(() => getData());
onUpdated(() => getData());
</script>
<template>
  <q-page class='q-pa-md'>

    <q-div>
      <div class="q-pb-md" v-for="(item, i) in items" :key="i">
        <StreamListItem :item="item" />
      </div>
    </q-div>
  </q-page>
</template>

<style>
#head{
  background: #3CD3AD;
  text-align: center;

}
</style>