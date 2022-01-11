<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';
import {
  QueryDocumentSnapshot,
  DocumentData,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from 'boot/firebase';
import StreamVideo from 'src/components/StreamVideo.vue';

const props = defineProps<{
  streamDocId: { type: string };
}>();

const stream = ref<QueryDocumentSnapshot<DocumentData>>();

const getData = async () => {
  const ref = doc(db, 'streams', props.streamDocId);
  stream.value = await getDoc(ref);
};
onMounted(() => getData());
</script>
<template>
  <q-page>
    <div class="row full-width justify-center items-center content-center">
      <StreamVideo
        v-if="stream"
        class="col q-pa-md"
        :item="stream"
        style="max-width: 165vh"
      />
    </div>
  </q-page>
</template>
