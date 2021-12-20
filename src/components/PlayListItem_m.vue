<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import {  fasList } from '@quasar/extras/fontawesome-v5';
const props = defineProps<{
  item: QueryDocumentSnapshot<DocumentData>;
  len:number;
}>();
const splitterModel = ref(50);
const stream = computed(() => props.item.data());
const streamTo = computed(() => `/messagelist/${props.item.data().playlistName}`);
</script>
<template>
  <div min-width="200px">
    <router-link  :to="streamTo">
    <q-splitter
      v-model="splitterModel"
    >
    <template v-slot:before>
      <q-card>
          <q-img id='imageContainer' :src="stream.thumbnailUrl" :ratio="16 / 9"/>
          <div id='center'>
            <br>
            <span>{{props.len}}</span>
            <div><q-icon color="grey" :name="fasList"  style="font-size: 2em;" /></div>
          </div>
      </q-card>
    </template>
    <template v-slot:after>
      <q-card id='playinfo'>
            <br>
        <div id='infoName' class='q-pl-sm'>{{stream.playlistName}}</div>
        <div id='infoOthers' class='q-pl-sm'>{{stream.preacher}}</div>
        <div id='infoOthers' class='q-pl-sm'>{{props.len}}개의 동영상</div>
      </q-card>
    </template>
    
    </q-splitter>
    </router-link>
  </div>
</template>
<style>
#infoName{
  font: 1.1em "Fira Sans", sans-serif;
  text-align: left;
  overflow: hidden;
   color:whitesmoke;
}
#infoOthers{
  font: 0.9em "Fira Sans", sans-serif;
  text-align: left;
  overflow: hidden;
}
#playbody{
   display: inline-block;
}
#playinfo{
  height:28.2vw;
   text-align: center;
   align-items: center;
   justify-content: center;
   background-color: rgba(0, 0, 0, 0.6);
   color:#D3D3D3;
}

#imageContainer {
   display: inline-block;
   text-align: center;
   color: rgb(64, 11, 124);
}
#center {
   position: absolute;
   text-align: center;
   align-items: center;
   justify-content: center;
   top: 50%;
   left: 75%;
   height: 100%;
   width: 50%;
   background-color: rgba(0, 0, 0, 0.6);;
   transform: translate(-50%, -50%);
   color:floralwhite;
}
span{
  vertical-align: middle;
  font: 2em "Fira Sans", sans-serif;
}
</style>