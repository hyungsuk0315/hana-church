
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
    q = query(collection(db, 'streams'), where('playlistName', '==', props.tag));
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
const test = ()  => {
  console.log('test - ', items.value[0].data())
  let out = [];
  let small = [];
  for(var i = 0 ; i < items.value.length ; i++){
    if(i % 4 === 0){
      if(i > 0)
        out.push(small);
      small = [];
    }
    small.push(items.value[i].data());
  }
  console.log('out - ',out);
  const tt = out
  return out;
}
const slide = ref(1);
// onMounted(() => getData());
onMounted(() => {
  const fetchData = new Promise((resolve, reject)=>{
    console.log('doing something')
    resolve('fetchData')
  })
    .then((val) => console.log('promise then - ', val))
    .then(val => getData())
    .then(val => test())
    .finally(console.log('finally - ', tt))
})
</script>
<template>
  <div class="q-pa-md">
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="primary"
      padding
      arrows
      height="350px"
      class="bg-grey-1 shadow-2 rounded-borders"
    >
      <q-carousel-slide   :name="1" class="column no-wrap">
        <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
        <!-- <div
        class="col-3"
        v-for="item in items"
        :key="item"
      > -->
          <div v-for="(item, i) in test" :key="i">
            item
          </div>
        <!-- <StreamListItem :item="item" /> -->
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
