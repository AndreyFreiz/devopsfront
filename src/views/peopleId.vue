<script setup>
import {onMounted} from "vue";
import {peoplesComp} from "@/composables/peoples";
const { getPeople, currentPeople } = peoplesComp()
import { useRoute } from "vue-router";
const route = useRoute();

onMounted( () => {
  getPeople(route.params.id);
});
</script>

<template>
<v-app >
<div v-if="currentPeople">
  <div> имя {{ currentPeople.name}}</div>
  <div> возраст {{ currentPeople.age}}</div>
  <div> Номер {{ currentPeople.PhoneNumber}}</div>
  <div></div>
</div>
<div v-else>Идет загрузка данных</div>
</v-app>
</template>

<style scoped>

</style>
