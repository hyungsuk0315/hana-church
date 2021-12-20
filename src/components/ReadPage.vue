<script setup lang="ts">
import { ref, onMounted, defineProps,  watchEffect } from 'vue';
const props = defineProps<{
  date: string;
  checked: string[];
  fontSize:number;
}>();

const checkedDate = ref(props.checked); //date list of readers
//update date list of readers
const setReadDate = ( date:string) => {
  if(checkedDate.value.indexOf(date) < 0)
  {
    checkedDate.value.push(date);
  }
  else{
    let idx = checkedDate.value.indexOf(date);
    checkedDate.value.splice(idx, 1) ;
  }
};
//update date list of readers
//set check button's style by reader's status
const setStyleBtn = () => {
  if(props.checked == undefined || props.date == undefined)
    return 'background-color:#FFFFFF';
  else if(props.checked.indexOf(props.date) > -1)
    return 'background-color:#3CD3AD';
  else 
    return 'background-color:#FFFFFF';
}
//set check button's style by reader's status
const tab = ref(0);//bible script tab
const bookList = ref([]);//today's bible list 
//staus changed (read -> unread) or (unread -> read)
const onClickComplete = () => {
  setReadDate(props.date);
}
//test bible data
const onChangeTab = function(){
  bookList.value = [
    {
      title:'창세기1',
      bookId:1,
      chapter:1,
      verses:{
        '1':'태초에 하나님이 천지를',
        '2':'땅이 혼돈스..',
      }
    },
    {
      title:'창세기2',
      bookId:1,
      chapter:2,
      verses:{
        '1':'태초에 하나님이 천지를',
        '2':'땅이 혼돈스..'
      }
    }, 
    {
      title:'창세기3',
      bookId:1,
      chapter:3,
      verses:{
        '1':'태초에 하나님이 천지를',
        '2':'땅이 혼돈스..'
      }
    },
    {
      title:'창세기4',
      bookId:1,
      chapter:4,
      verses:{
        '1':'태초에 하나님이 천지를',
        '2':'땅이 혼돈스..'
      }
    }
    ];
  tab.value = 0;
}
//test bible data

const init = () => {
  new Promise((resolve) => {
    resolve(onChangeTab());
  })
    .catch(e => console.log(e))
}
//check status
watchEffect(() => {
  checkedDate.value = props.checked;
})
//check status
const getFontSize = () => { return `font-size:${props.fontSize * 1}px`} //fontsize adjust
onMounted(() => init())
</script>
<template>
  <div class="q-pa-md" >
    <div class="q-gutter-y-md" style="min-width: 70vw;">
      <q-card :style="getFontSize()">
        
        <q-tabs 
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab 
          v-for="(book, i) in bookList"
          :key = i
          :name="i" :label="book.title" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated >
          <q-tab-panel 
          v-for="(book, i) in bookList"
          :key = i
          :name="i"
          >
            <div class="q-pb-lg">{{book.title}}</div>
            <div v-for="(verse, key) in book.verses" :key="key">
              <span>{{key}}. {{verse}}</span>
            </div>
            <div  style=" display: table;  margin-left: auto;">
              <q-btn @click="onClickComplete()" v-if="i === bookList.length-1" :key="props.date" square icon="check" :style="setStyleBtn()"></q-btn>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>
<style>
#page{
  background-color: cadetblue;
}
</style>
