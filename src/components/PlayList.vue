
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
import { onMounted, ref, defineProps } from 'vue';

const props = defineProps<{
  tag: string;
}>();

const items = ref<QueryDocumentSnapshot<DocumentData>[]>([]);
const getData = async () => {
  let q;
  if (props.tag) {
    q = query(
      collection(db, 'streams'),
      where('playlistName', '==', props.tag)
    );
  } else {
    q = query(collection(db, 'streams'));
  }

  const querySnapshot = await getDocs(q);
  items.value = querySnapshot.docs;

  // sort by latest order
  items.value = items.value.sort(
    (a, b) => (a.data().date < b.data().date && 1) || -1
  );
  console.log('[PlayList]', items.value[0].data());
};

onMounted(() => getData());
</script>
<template>
  <div class="q-py-sm q-px-md">
    <div class="q-pa-xs text-weight-bold text-h6 justify-center">
      # {{ props.tag }}
    </div>
    <q-scroll-area style="height: 235px; max-width: 100%">
      <q-div class="row fit justify-start items-start q-gutter-xs no-wrap">
        <StreamListItem
          class="q-pa-xs"
          imgStyle="width: 200px; height: 112px;"
          cardStyle="width: 200px; height: 112px;"
          :item="item"
          v-for="(item, key) in items"
          :key="key"
        />
      </q-div>
    </q-scroll-area>
  </div>
</template>

<style lang="scss" scoped></style>