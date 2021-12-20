<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import {   fasList } from '@quasar/extras/fontawesome-v5';

const props = defineProps<{
  item: QueryDocumentSnapshot<DocumentData>;
}>();
const stream = computed(() => props.item.data());
const streamTo = computed(() => `/Watch/${props.item.id}`);
console.log('prps ', props.item)
</script>
<template>
  <div min-width="200px">
    <router-link  :to="streamTo">
      <q-card style="  border:2px solid #D3D3D3;">
        <q-img :src="stream.thumbnailUrl" :ratio="16 / 9"/>
        <div id="infoContainer">
          <div class='q-pt-md q-pl-md'>
            <q-icon color="grey" :name="fasList"  style="font-size: 2em;" />
          </div>
        <q-toolbar-title id="title" class="q-pl-md q-py-sm" style="font: 1.3em; color:rgba(0,0,0,1)">
              {{stream.title}}
              <br>
              <div id='infoPreacher' style="font: 0.8em; color:rgba(0,0,0,0.5)">{{stream.preacher}}<br>{{stream.date.split('T')[0]}}</div>
        </q-toolbar-title>     
        </div>   
      </q-card>
    </router-link>
  </div>
</template>

<style>
#infoContainer{
  display: flex;
  vertical-align:middle;
}
#title{
  display: inline;
  font: 1.2em "Fira Sans", monospace;
  color: black;
}
#logo{
  display:table-cell; 
  vertical-align:middle;
}
</style>