
<script setup>
import {peoplesComp} from "@/composables/peoples";
import { onMounted, ref} from "vue";
import router from "@/router";

const { peoples, getPeoples, deletePeople, updatePeople, createPeople } = peoplesComp()
const editModal = (item, row) => {
  currentUser.value.id = row.item.books[0].personId
  currentUser.value.name = row.item.name
  currentUser.value.age = row.item.age
  currentUser.value.PhoneNumber = row.item.PhoneNumber
  currentUser.value.booksId = row.item.books
  booksDeleted.value = []

  openEditModalUser.value = true
}
const deleteBook = (value) => {
    currentUser.value.booksId = currentUser.value.booksId.filter(el => el.id !== value.id)
    currentUser.value.booksId.forEach(el => {
        booksDeleted.value.push(el.id)
    })
}
const closeEditModal = (id, data, deleted = false) => {
  if (deleted) {
    deletePeople(id)
    openEditModalUser.value = false
  }
  if (!deleted) {
      data.booksId = booksDeleted.value
    updatePeople(data)
    openEditModalUser.value = false
  }
}
const booksDeleted = ref([])
const openAddNewUser = () => {
  openCreateUserModal.value = true
}
const newUser = {
  name: '',
  age: '',
  PhoneNumber: ''
}

const currentUser = ref({
  id: '',
  name: '',
  age: '',
  PhoneNumber: '',
  booksId: []
})
const closeCreateUserModal = (save = false) => {
  if (save) {
     createPeople(newUser)
  }
  openCreateUserModal.value = false
}
const openCreateUserModal = ref(false)
const openEditModalUser = ref(false)
const headers = ref([
    { title: 'Имя', align: 'start', sortable: false, key: 'name' },
    { title: 'Возраст', align: 'end', key: 'age' },
    { title: 'Номер телефона', align: 'end', key: 'PhoneNumber' },
  ])

onMounted(() => {
  getPeoples()
})
</script>

<template>
  <v-app>
    <div class="container">
      <div class="btn-container">
        <v-btn class="btn" flat  @click="openAddNewUser">Добавить пользователя</v-btn>
        <v-btn value="книги" class="btn"  @click="router.push('/books')">
          <span>книги</span>
        </v-btn>
      </div>
      <v-container>
        <v-data-table-virtual
          :headers="headers"
          :items="peoples"
          class="elevation-1"
          height="400"
          item-value="name"
          @click:row="editModal"
        ></v-data-table-virtual>
      </v-container>
    </div>
    <v-row justify="center">
      <v-dialog
        v-model="openCreateUserModal"
        width="800"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Добавить пользователя</span>
          </v-card-title>
          <v-card-text>
          </v-card-text>
            <v-spacer></v-spacer>
            <v-form @submit.prevent>
              <v-col
                cols="12"
                md="12"
              >
              <v-text-field
                label="Имя"
                @change="newUser.name = $event.target.value"
                hide-details="auto"
              ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="12"
              >
              <v-text-field
                label="Возраст"
                @change="newUser.age = $event.target.value"

                hide-details="auto"
              ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="12"
              >

              <v-text-field
                @change="newUser.PhoneNumber = $event.target.value"
                label="Номер телефона"
                hide-details="auto"
              ></v-text-field>
              </v-col>

              <v-btn
                color="green-darken-1"
                variant="text"
                @click="closeCreateUserModal(true)"
              >
                Добавить
              </v-btn>
              <v-btn
                color="green-darken-1"
                variant="text"
                @click="closeCreateUserModal"
              >
                Отменить
              </v-btn>
            </v-form>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="openEditModalUser"
        width="800"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Редактировать пользователя</span>
          </v-card-title>
          <v-card-text>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-form @submit.prevent>
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                label="Имя"
                @change="currentUser.name = $event.target.value"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                label="Возраст"
                @change="currentUser.age = $event.target.value"

                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                @change="currentUser.PhoneNumber = $event.target.value"
                label="Номер телефона"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col
                    cols="12"
                    md="12"
            >
              <p> Книги</p>
              <v-list :items="currentUser.booksId"
              >
                <v-list-item
                    v-for="(item, i) in currentUser.booksId"
                    :key="i"
                    :value="item"
                    color="primary"
                    @click="deleteBook(item.id)"
                >
                  <v-list-item-title > {{ item.name }} {{ item.id}} </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
            <v-btn
              color="green-darken-1"
              variant="text"
              @click="closeEditModal(currentUser.id, currentUser)"
            >
              Редактировать
            </v-btn>
            <v-btn
              color="error"
              variant="text"
              @click="closeEditModal(currentUser.id, [], true)"
            >
              удалить
            </v-btn>
            <v-btn
                color="green-darken-1"
                variant="text"
                @click="router.push(`/peoples/${currentUser.id}`)"
            >
              Перейти к человеку
            </v-btn>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>

  </v-app>
</template>

<style scoped>
.btn {
  margin-top: 20px;
  margin-left: 20px;
  width: 300px;
}
.container {
  width: 1180px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  margin: 0 auto;
}
.btn-container {
  display: flex;
  justify-content: space-between;
}
</style>
