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
import StreamScroll from 'src/components/StreamScroll.vue';

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
  <div>
    <div class="row">
      <StreamVideo
        v-if="stream"
        class="col-12 col-md-8"
        :item="stream"
      />
      <StreamScroll v-if="stream" class="col-12 col-md-4" />
    </div>
  </div>
</template>
