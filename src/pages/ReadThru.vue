<script setup lang="ts">
import ReadPage from 'src/components/ReadPage.vue';
import { firebaseUser } from 'src/composables/useAuth';
import { ref, watchEffect } from 'vue';
import { db } from 'boot/firebase';
import { 
  setDoc,
  doc,
  getDoc,
  QueryDocumentSnapshot,
  DocumentData, } from 'firebase/firestore';

const readPlan = ref();
const fontSize = ref();
const options = [{label: '1독',value: 1},{label: '2독',value: 2},{label: '3독',value: 3}];  
const dialog = ref(false);
const date = ref('2021/12/15');
const proxyDate = ref('2021/12/15')
const events = ref<string[]>();

//date
const updateProxy = function() { 
  proxyDate.value = date.value;
}
const save = function() {
  date.value = proxyDate.value;
}
//date
//selected date
const dateStr = function() {
  let str = date.value.split('/');
  return str[0] + '년 ' + str[1] + '월 ' + str[2] + '일';
}
const onPrevDate = function () {
  let str = date.value.split('/');
  let day = new Date(parseInt(str[0]), parseInt(str[1])-1, parseInt(str[2])-1);
  date.value = day.getFullYear().toString() + '/' + (day.getMonth()+1).toString() + '/' +day.getDate().toString();
  proxyDate.value = date.value;
}
const onNextDate = function () {
  let str = date.value.split('/');
  let day = new Date(parseInt(str[0]), parseInt(str[1])-1, parseInt(str[2])+1);
  date.value = day.getFullYear().toString() + '/' + (day.getMonth()+1).toString() + '/' +day.getDate().toString();
  proxyDate.value = date.value;
}
//selected date
//firebase functions 
const item = ref<QueryDocumentSnapshot<DocumentData>>();
const getUserInfo = async () => {
  if(firebaseUser.value !== null){
    const ref = doc(db, 'users', firebaseUser.value.uid);
    item.value = await getDoc(ref);
    if(item.value.data() == undefined){
    }
    else if(item.value.data().readPlan == undefined){
    }
    else{
      readPlan.value = item.value.data().readPlan;
      events.value = item.value.data().checkedDate;
      fontSize.value = item.value.data().fontSize;
    }
    checkInit.value = true;
  }
};
const setUserInfo = async () => {
  await setDoc(doc(db, 'users', firebaseUser.value.uid ), {
    'checkedDate' : events.value,
    'readPlan' : readPlan.value,
    'fontSize' : fontSize.value,
  })
};
const registerUserInfo = () => {
  new Promise((resolve) => {
    resolve(setUserInfo());
  })
    .catch(e => console.log(e))
}
//firebase functions
//update data & initialize
const checkInit = ref(false); //check firebase data set
watchEffect(() => {
  if(firebaseUser.value !== null)    
  {
    if(!checkInit.value){ //initialize 
      new Promise((resolve) => {
          resolve(getUserInfo());
      })
        .catch(e => console.log(e))
    }
    else
      registerUserInfo();
  }
})
//update data 
</script>
<template>
  <q-page padding v-if="firebaseUser" >
    <div id='title' class="q-pa-md">
      <q-icon name='book' size='lg'></q-icon>
      <div class='q-pb-md text-h6'>하나통독</div>
    </div>
    <div id='menu'>

      <div id="date" class="">

        <q-btn icon="event" round color="primary">
          <q-popup-proxy @before-show="updateProxy()" cover transition-show="scale" transition-hide="scale">
            <q-date v-model="proxyDate" :events="events">
              <div class="row items-center justify-end q-gutter-sm">
                <q-btn label="Cancel" color="primary" flat v-close-popup />
                <q-btn label="OK" color="primary" flat @click="save()" v-close-popup />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-btn>
      </div>

    <q-btn  round icon="settings" color="primary" @click="dialog = true"  />
    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section style="display:flex; border-bottom: 1px solid black;">
          <div class="text-h6">설정</div>
          <q-btn v-close-popup square icon="close" color="primary" padding="xs" style="margin-left:auto;"/>
        </q-card-section>
          
        <q-card-section class="row items-center q-gutter-sm">
          <span>통독 플랜</span>
        <q-option-group
          name="preferred_genre"
          v-model="readPlan"
          :options="options"
          color="primary"
          inline
        />
        </q-card-section>
        <q-card-section  style="display:flex;">
          <span>글씨 크기</span>
          <q-slider
            style="width:15vw;"
            v-model="fontSize"
            :min="1"
            :max="100"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    </div>
      <div id='showDate'>
        <q-btn @click="onPrevDate()" round color="primary" label="<" align="around"/>
        <span :key="date" class="q-px-lg">{{dateStr()}}</span>
        <q-btn @click="onNextDate()"  label=">"  round color="primary"  align="around"/>
      </div>
      <read-page id='script' :date="date" :checked="events" :fontSize="fontSize" ></read-page>
  </q-page>
</template>

<style>
#showDate{
 display: table; 
 margin-left: auto; 
 margin-right: auto;
}
#title{
  display: flex;
}
#menu{
  display: flex;
}
#repeat{
  margin-top: auto;
}
#date{
  
  margin-left: auto;
}
#script{

}
</style>