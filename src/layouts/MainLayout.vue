<script setup lang="ts">
import { ref } from 'vue';
import {
  fasHome,
  fasVideo,
  fasGrinStars,
  fasBook,
  fasBookmark,
  fasPen,
  fasDiceOne,
} from '@quasar/extras/fontawesome-v5';
import AuthBtn from 'components/auth/AuthBtn.vue';
import { useQuasar } from 'quasar';
const $q = useQuasar();

const leftDrawerOpen = ref(false);
// const search = ref('');
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
const links1 = [
  { icon: fasHome, text: '홈', url: '/' },
  { icon: fasVideo, text: '예배 LIVE', url: '/worship-live' },
];
const links2 = [
  { icon: fasBookmark, text: 'UCM 예배', url: '/message/UCM' },
  { icon: fasPen, text: 'HTS 성경공부', url: '/message/HTS' },
  { icon: fasDiceOne, text: 'ONE VERSE', url: '/message/OneVerse' },
];
const links3 = [
  { icon: fasBook, text: '하나통독', url: '/read-thru' },
  { icon: fasGrinStars, text: '조이챈트', url: '/joy-chant' },
];
const links4 = [
  { icon: 'newspaper', text: '소식' },
  { icon: 'people', text: '공동체' },
  { icon: 'map', text: '오시는길' },
  { icon: 'help', text: '문의' },
];
// const buttons1 = [
//   { text: 'About' },
//   { text: 'Press' },
//   { text: 'Copyright' },
//   { text: 'Contact us' },
//   { text: 'Creators' },
//   { text: 'Advertise' },
//   { text: 'Developers' },
// ];
// const buttons2 = [
//   { text: 'Terms' },
//   { text: 'Privacy' },
//   { text: 'Policy & Safety' },
//   { text: 'Test new features' },
// ];
</script>
<template>
  <q-layout view="hHr Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-primary text-white q-pa-xs">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="q-my-md q-mx-xs"
        />

        <router-link to="/" style="text-decoration: none; color: inherit">
          <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs" #>
            <q-toolbar-title class="text-weight-bold">
              신촌하나교회
            </q-toolbar-title>
          </q-btn>
        </router-link>

        <q-space />

        <!-- <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            round
            dense
            flat
            color="grey-8"
            icon="video_call"
            v-if="$q.screen.gt.sm"
          >
            <q-tooltip>Create a video or post</q-tooltip>
          </q-btn>
          <q-btn
            round
            dense
            flat
            color="grey-8"
            icon="apps"
            v-if="$q.screen.gt.sm"
          >
            <q-tooltip>Apps</q-tooltip>
          </q-btn>
          <q-btn
            round
            dense
            flat
            color="grey-8"
            icon="message"
            v-if="$q.screen.gt.sm"
          >
            <q-tooltip>Messages</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating> 2 </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
        </div> -->
        <AuthBtn />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      elevated
      :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
      :width="240"
    >
      <q-scroll-area class="fit">
        <!--<div class="q-pa-lg bg-white">
          <q-img
            fit="fill"
            src="../assets/hana-church-logo.png"
            spinner-color="white"
          />
        </div>-->
        <q-item
          v-for="link in links1"
          :key="link.text"
          v-ripple
          clickable
          :to="link.url"
        >
          <q-item-section avatar>
            <q-icon color="grey" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-mt-md q-mb-xs" />

        <q-item-label
          header
          class="text-weight-bold text-uppercase text-justify"
        >
          <q-icon name="mdi-tree-outline" /> 메시지
        </q-item-label>

        <q-item
          v-for="link in links2"
          :key="link.text"
          v-ripple
          clickable
          :to="link.url"
        >
          <q-item-section avatar>
            <q-icon color="grey" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-mt-md q-mb-xs" />

        <q-item-label
          header
          class="text-weight-bold text-uppercase text-justify"
        >
          <q-icon name="mdi-tree-outline" /> 신앙생활
        </q-item-label>

        <q-item
          v-for="link in links3"
          :key="link.text"
          v-ripple
          clickable
          :to="link.url"
        >
          <q-item-section avatar>
            <q-icon color="grey" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item-label
          header
          class="text-weight-bold text-uppercase text-justify"
        >
          <q-icon name="mdi-tree-outline" /> 안내
        </q-item-label>

        <q-item v-for="link in links4" :key="link.text" v-ripple clickable>
          <q-item-section avatar>
            <q-icon color="grey" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-mt-md q-mb-lg" />

        <div class="q-px-md text-grey-9">
          <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
            <a
              v-for="button in buttons1"
              :key="button.text"
              class="YL__drawer-footer-link"
              href="javascript:void(0)"
            >
              {{ button.text }}
            </a>
          </div>
        </div>
        <div class="q-py-md q-px-md text-grey-9">
          <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
            <a
              v-for="button in buttons2"
              :key="button.text"
              class="YL__drawer-footer-link"
              href="javascript:void(0)"
            >
              {{ button.text }}
            </a>
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style lang="sass">
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 55%
  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000
</style>
