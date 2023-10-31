<script setup>
import {onMounted} from "vue";
import {booksComp} from "@/composables/books";
const { getBook, currentBook } = booksComp()
import { useRoute } from "vue-router";
const route = useRoute();

onMounted( () => {
  getBook(route.params.id);
});
</script>

<template>
  <v-app >
    <div v-if="currentBook">
      <div> имя {{ currentBook.name}}</div>
      <div> автор {{ currentBook.author}}</div>
      <div> жанр {{ currentBook.genre}}</div>
      <div> описание {{ currentBook.description}}</div>
      <div></div>
    </div>
    <div v-else>Идет загрузка данных</div>
  </v-app>
</template>

<style scoped>

</style>
