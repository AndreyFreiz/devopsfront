<template>
  <v-app-bar flat>
    <v-app-bar-title>
     devops front
    </v-app-bar-title>
    <v-btn value="Люди" @click="router.push('/peoples')">
      <span>Люди</span>
    </v-btn>
    <v-btn value="книги" @click="router.push('/books')">
      <span>книги</span>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
  //
import router from "@/router";
</script>
