
<script setup lang="ts">
import StreamListItem from 'src/components/StreamListItem.vue';
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

  // sort by latest order
  items.value = items.value.sort(
    (a, b) => (a.data().date < b.data().date && 1) || -1
  );
  console.log('[PlayList]', items.value[0].data());
};

const test = function() {
  let arr = [];
  for(var i = 0 ; i < items.value.length ; i = i+4){
    try{
      let unit = [];
      items.value[i] != undefined?unit.push(items.value[i]):unit.push(item.value);
      items.value[i+1] != undefined?unit.push(items.value[i+1]):unit.push(item.value);
      items.value[i+2] != undefined?unit.push(items.value[i+2]):unit.push(item.value);
      items.value[i+3] != undefined?unit.push(items.value[i+3]):unit.push(item.value);
      arr.push(unit);
    }
    catch(e){
      console.log('catch - ', e);
    }
  }
  console.log('arr - ' ,arr)
  return arr;
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
    <!-- <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="primary"
      padding
      arrows
      class="bg-grey-1 shadow-2 rounded-borders"
      height="18vw"
    >

    
      <q-carousel-slide v-for="(units, i) in test()" :key='i' :name="i">
        <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
          <div class="rounded-borders col full-height q-pa-md" v-for="(unit, i ) in units" :key='i' >
            <StreamListItem style="width: 15vw"  :item="unit" />
          </div>
        </div>
      </q-carousel-slide>

    </q-carousel> -->
    <q-toolbar-title>{{props.tag}} 재생목록</q-toolbar-title>
    <q-scroll-area style="height: 18vw; width:100%; ">
    <div class='row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap'>
          <div id='list' v-for="(unit, i ) in items" :key='i' class="q-pr-md"  >
            <StreamListItem style="width: 20vw"  :item="unit" />
          </div>
    </div>
    </q-scroll-area>
  </div>
</template>


<style lang="scss" scoped>
  q-card{
  }
</style>