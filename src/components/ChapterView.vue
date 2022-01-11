<script setup lang="ts">
import { ref, onMounted, onUpdated, defineProps, computed } from 'vue';
import { bookStringTableKr, bookStringTableEn } from 'components/strings';
import { ChapterResponse, Chapter } from 'components/models';
import { fasFileAudio } from '@quasar/extras/fontawesome-v5';
import { useTts, speak } from 'src/composables/useTts';

const props = defineProps<{
  bookId: number;
  chapter: number;
  fontSize: number;
}>();

function getBookKey(bookId: number): string {
  return bookStringTableEn[bookId];
}
function getBookString(bookId: number): string {
  return bookStringTableKr[bookId];
}
function getChapterString(bookId: number, chapter: number): string {
  // psalm
  if (bookId == 18) {
    return `${chapter}편`;
  } else {
    return `${chapter}장`;
  }
}

const getChapter = async (
  bookId: number,
  chapter: number
): Promise<Chapter> => {
  const bookKey = getBookKey(bookId);
  console.log(`bookKey: ${bookKey}`);
  return fetch(`https://signal.lionandthelab.com/${bookKey}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('response: ', data);

      return (data as ChapterResponse)[chapter];
    });
};

const verseTexts = ref<string[]>([]);
const chapter = ref<Chapter>();
const titleFontSize = computed(() => props.fontSize * 1.3);
const contentFontSize = computed(() => props.fontSize * 1.0);
const bookString = computed(() => getBookString(props.bookId));
const chapterString = computed(() =>
  getChapterString(props.bookId, props.chapter)
);

const titleStyle = () => {
  return `font-size: ${titleFontSize.value}px`;
};
const contentStyle = () => {
  return `font-size: ${contentFontSize.value}px`;
};

const getData = async () => {
  chapter.value = await getChapter(props.bookId, props.chapter);

  const verses = chapter.value.verses;
  verseTexts.value.push(`${bookString.value} ${chapterString.value}}`);
  var prevTitle = '';
  verses.map((v) => {
    if (v.title) {
      if (prevTitle != v.title) {
        verseTexts.value.push(v.title);
      }
      prevTitle = v.title;
    }
    verseTexts.value.push(v.content);
  });
};

onMounted(() => getData());
onUpdated(() => {
  useTts();
});
</script>
<template>
  <div v-if="chapter">
    <div
      class="row q-pa-lg text-h5 items-center justify-center"
      :style="titleStyle()"
    >
      <div class="col">
        {{ bookString }} {{ chapterString }}
        <q-btn
          flat
          color="primary"
          :icon="fasFileAudio"
          round
          @click="speak(verseTexts)"
        />
      </div>
    </div>
    <div
      class="q-pa-md"
      :style="contentStyle()"
      v-for="(verse, i) in chapter.verses"
      :key="i"
    >
      <div v-if="i == 0">{{ verse.title }}</div>
      <div>{{ verse.index }}. {{ verse.content }}</div>
    </div>
    <div>{{ chapter.comments }}</div>
  </div>
  <div v-else>Loading {{ bookString }} {{ chapterString }}...</div>
</template>
<style></style>
