<script setup lang="ts">
import { ref, onMounted, defineProps, watchEffect, computed } from 'vue';
import ChapterView from 'src/components/ChapterView.vue';
import { Schedule, ScheduleResponse } from 'components/models';
import { bookStringTableKr } from 'components/strings';

const props = defineProps<{
  date: string;
  readPlan: number;
  checked: string[];
  fontSize: number;
}>();

const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

const checkedDate = ref(props.checked); //date list of readers

//update date list of readers
const setReadDate = (date: string) => {
  if (checkedDate.value.indexOf(date) < 0) {
    console.log('registered');
    checkedDate.value.push(date);
  } else {
    console.log('already registered');
    let idx = checkedDate.value.indexOf(date);
    checkedDate.value.splice(idx, 1);
    console.log('set read date ', checkedDate.value);
  }
};

//update date list of readers
//set check button's style by reader's status
const setStyleBtn = () => {
  if (props.checked == undefined || props.date == undefined)
    return 'background-color:#FFFFFF';
  else if (props.checked.indexOf(props.date) > -1)
    return 'background-color:#3CD3AD';
  else return 'background-color:#FFFFFF';
};

//set check button's style by reader's status
const tab = ref(0); //bible script tab
const schedules = ref<Schedule[]>([]); //today's bible list

function getNotationString(bookId: number, chapter: number): string {
  if (bookId == 18) {
    return `${bookStringTableKr[bookId]}${chapter}편`;
  } else {
    return `${bookStringTableKr[bookId]}${chapter}장`;
  }
  return;
}

//staus changed (read -> unread) or (unread -> read)
const onClickComplete = () => {
  console.log('click ', props.date);
  setReadDate(props.date);
};

//test bible data
const onChangeTab = async () => {
  await getData();
  tab.value = 0;
};

// FIXME
const getScheduleKeys = () => {
  var scheduleKeys = [];
  const targetDate = new Date(props.date);
  const readPlan = props.readPlan;
  console.log(`targetDate: ${targetDate.toString()}`);

  const firstDayOfTargetDate = new Date(targetDate.getFullYear(), 0, 1);

  const diffFromFirstDay = Math.round(
    Math.abs((targetDate - firstDayOfTargetDate) / oneDay)
  );
  console.log(`firstDayOfTargetDate: ${firstDayOfTargetDate.toString()} `);
  console.log(`diffFromFirstDay: ${diffFromFirstDay * readPlan} `);

  for (var i = 0; i < readPlan; i++) {
    var _date = new Date(firstDayOfTargetDate);
    _date.setDate(_date.getDate() + diffFromFirstDay * readPlan + i);
    console.log(`_date: ${_date.toString()}`);
    var month = _date.getMonth() + 1;
    var day = _date.getDate();
    console.log(`new key: ${month}/${day}`);

    scheduleKeys.push(`${month}/${day}`);
  }

  return scheduleKeys;
};

const getData = async () => {
  const scheduleKeys: string[] = getScheduleKeys();
  // const scheduleKeys: string[] = [`${month}/${day}`];
  schedules.value = [];
  return fetch('https://signal.lionandthelab.com/schedule')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (var i = 0; i < scheduleKeys.length; i++) {
        console.log(`scheduleKeys: ${scheduleKeys[i]}`);
        console.log(
          'response[scheduleKey]: ',
          (data as ScheduleResponse)[scheduleKeys[i]]
        );

        schedules.value = schedules.value.concat(
          (data as ScheduleResponse)[scheduleKeys[i]]
        );
        console.log(schedules.value);
      }
      console.log(`schedules: ${schedules.value[0].bookId}`);
    });
};

const init = () => {
  new Promise((resolve) => {
    resolve(console.log('read page init ', props.checked));
  })
    .then(() => onChangeTab())
    .catch((e) => console.log(e));
};

//check status
watchEffect(() => {
  checkedDate.value = props.checked;
});

const tabFontSize = computed(() => props.fontSize * 0.8);

const tabStyle = () => {
  return `font-size: ${tabFontSize.value}px`;
};

onMounted(() => init());
</script>
<template>
  <div
    style="width: 100%; height: 100vh"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
  >
    <div class="q-px-xl" :style="tabStyle()">
      <q-tabs
        v-model="tab"
        class="text-grey q-px-xs"
        active-color="primary"
        indicator-color="primary"
        narrow-indicator
      >
        <q-tab
          v-for="(schedule, i) in schedules"
          :key="i"
          :name="i"
          :label="getNotationString(schedule.bookId, schedule.chapter)"
        />
      </q-tabs>
    </div>

    <div class="q-pa-none">
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel
          style="min-height: 100vh"
          v-for="(schedule, i) in schedules"
          :key="i"
          :name="i"
        >
          <ChapterView
            :fontSize="fontSize"
            :bookId="schedule.bookId"
            :chapter="schedule.chapter"
          />
          <div
            v-if="i === schedules.length - 1"
            style="display: table; margin-left: auto"
          >
            <q-page-sticky position="bottom-right" :offset="[18, 18]">
              <q-btn
                @click="onClickComplete()"
                :style="setStyleBtn()"
                round
                color="primary"
                icon="check"
              />
            </q-page-sticky>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>
<style></style>
