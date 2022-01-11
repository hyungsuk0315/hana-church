import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }],
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Admin.vue') }],
  },
  {
    path: '/worship-live',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/WorshipLive.vue') }],
  },
  {
    path: '/one-verse',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/OneVerse.vue') }],
  },
  {
    path: '/qt',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/QT.vue') }],
  },
  {
    path: '/joy-chant',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/JoyChant.vue') }],
  },
  {
    path: '/read-thru',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ReadThru.vue') }],
  },
  {
    path: '/message/:tag',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/message/:tag',
        component: () => import('pages/Message.vue'),
        props: true,
      },
    ],
  },
  {
    path: '/watch/:streamDocId',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/watch/:streamDocId',
        component: () => import('pages/Watch.vue'),
        props: true,
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
