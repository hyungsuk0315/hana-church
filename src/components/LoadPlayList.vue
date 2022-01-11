<script setup lang="ts">
import { ref } from 'vue';
import { isSigned, firebaseUser } from 'src/composables/useAuth';
import { setDoc, doc } from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { useQuasar } from 'quasar';
import { PlayListItem, PlaylistItemListResponse } from 'src/components/models';

const $q = useQuasar();

const playlistId = ref('');
const tag = ref('');
const preacher = ref('');
const playlistName = ref('');

// to use fetch with typescript
// ref: https://stackoverflow.com/questions/41103360/how-to-use-fetch-in-typescript
function api<T>(url: string): Promise<T> {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<T>;
    })
    .then((data) => {
      console.log('response: ', data);
      /* <-- data inferred as { data: T }*/
      return data;
    });
}

const registerStream = async (playlistItem: PlayListItem) => {
  await setDoc(
    doc(
      db,
      'streams',
      `${playlistItem.snippet.resourceId.videoId}_${playlistName.value}`
    ),
    {
      title: playlistItem.snippet.title,
      url: `https://www.youtube.com/embed/${playlistItem.snippet.resourceId.videoId}?rel=0`,
      tag: tag.value,
      preacher: preacher.value,
      thumbnailUrl: playlistItem.snippet.thumbnails.high.url,
      date: playlistItem.snippet.publishedAt,
      playlistName: playlistName.value,
      playlistId: playlistId.value,
    }
  );
  // clear();
  $q.notify({
    message: '등록되었습니다',
    color: 'primary',
    icon: 'announcement',
  });
};
const registerStreamList = async () => {
  await setDoc(doc(db, tag.value, playlistId.value), {
    playlistName: playlistName.value,
    playlistId: playlistId.value,
  });
  // clear();
  $q.notify({
    message: '등록되었습니다',
    color: 'primary',
    icon: 'announcement',
  });
};

const registerPlaylistItems = async () => {
  console.log('playlistId: ', playlistId.value);

  await api<PlaylistItemListResponse>(
    'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=' +
      playlistId.value +
      '&key=AIzaSyChf0b_wFZEzL-iXpEUu0ujnU1ZQDsUmAY&maxResults=50'
  )
    // .then(response => response.json())
    .then((response: PlaylistItemListResponse) => {
      console.log('response: ', response);
      return response.items;
    })
    .then((playlistItems: PlayListItem[]) => {
      console.log('playlistItems: ', playlistItems);
      return playlistItems;
    })
    .then((playlistItems) => {
      playlistItems.map(async (item) => await registerStream(item));
      return playlistItems;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const onSubmit = async () => {
  await registerPlaylistItems();
  await registerStreamList();
};

const onReset = () => {
  // clear();
};
const existenceCheckRule = (val: string) =>
  (val && val.length > 0) || '입력란이 비었습니다';
</script>
<template>
  <q-card
    v-if="
      isSigned &&
      (firebaseUser?.email === 'lionandthelab@gmail.com' ||
        firebaseUser?.email === 'hyungsuk0315@gmail.com')
    "
  >
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-card-section>
        <q-input
          filled
          v-model="playlistId"
          label="재생목록 ID"
          hint="내용을 입력하세요"
          lazy-rules
          :rules="[existenceCheckRule]"
        />
        <q-input
          filled
          v-model="playlistName"
          label="재생목록 이름"
          hint="내용을 입력하세요"
          lazy-rules
          :rules="[existenceCheckRule]"
        />

        <q-input
          filled
          v-model="tag"
          label="분류"
          hint="내용을 입력하세요"
          lazy-rules
          :rules="[existenceCheckRule]"
        />

        <q-input
          filled
          v-model="preacher"
          label="메신저"
          hint="내용을 입력하세요"
          lazy-rules
          :rules="[existenceCheckRule]"
        />
      </q-card-section>

      <q-card-actions>
        <q-space />
        <q-btn label="등록" type="submit" color="primary" />
        <q-btn
          label="초기화"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </q-card-actions>
    </q-form>
  </q-card>
  <q-card v-else> 권한이 없습니다. </q-card>
</template>
