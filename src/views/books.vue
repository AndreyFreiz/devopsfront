<script setup>
import {onMounted, ref} from "vue";
import { booksComp } from '@/composables/books'
import router from "@/router";
 const { books, createBook, updateBook, deleteBook, getBooks} = booksComp()
const editModal = (item, row) => {
  console.log( row.item.bookName)
  peoplesDeleted.value = []
  currentBook.value.bookName = row.item.bookName
  currentBook.value.author = row.item.author
  currentBook.value.genre = row.item.genre
  currentBook.value.description = row.item.description
  currentBook.value.id = row.item.id
  openEditModalBook.value = true
}

onMounted(() => {
  getBooks()
})
const deletePeoples = (value) => {
  currentBook.value.personId = currentBook.value.personId.filter(el => el.id !== value.id)
  currentBook.value.personId.forEach(el => {
    peoplesDeleted.value.push(el.id)
  })
}
const closeEditModal = (id, data, deleted = false) => {
  if (deleted) {
    deleteBook(id)
    openEditModalBook.value = false
  }
  if (!deleted) {
    data.personId = peoplesDeleted.value
    updateBook(id, data)
    openEditModalBook.value = false
  }
}
const peoplesDeleted = ref([])

const openAddNewBook = () => {
  openCreateBookModal.value = true
}
const newBook = {
  bookName: '',
  author: '',
  genre: '',
  description: '',
}
const currentBook = ref({
  id: '',
  bookName: '',
  author: '',
  genre: '',
  description: '',
  personId: []
})
const closeCreateBookModal = (save = false) => {
  if (save) {
    createBook(newBook)
  }
  openCreateBookModal.value = false
}
const openCreateBookModal = ref(false)
const openEditModalBook = ref(false)
const headers = ref([
  {
    title: 'Название',
    align: 'start',
    sortable: false,
    key: 'bookName',
  },
  { title: 'Автор', align: 'end', key: 'author' },
  { title: 'Жанр', align: 'end', key: 'genre' },
  { title: 'Описание', align: 'end', key: 'description' },

])
</script>

<template>
  <v-app>
    <div class="container">
      <div class="btn-container">
        <v-btn class="btn" flat width="300px" @click="openAddNewBook">Добавить книгу</v-btn>
        <v-btn value="люди" class="btn"  width="300px" @click="router.push('/peoples')">
          <span>люди</span>
        </v-btn>
      </div>
      <v-container v-if="books">
        <v-data-table-virtual
          :headers="headers"
          :items="books"
          class="elevation-1"
          height="400"
          item-value="bookName"
          @click:row="editModal"
        ></v-data-table-virtual>
      </v-container>
    </div>
    <v-row justify="center">
      <v-dialog
        v-model="openCreateBookModal"
        width="800"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Добавить книгу</span>
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
                label="Название"
                @change="newBook.bookName = $event.target.value"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                label="Автор"
                @change="newBook.author = $event.target.value"

                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="12"
            >

              <v-text-field
                @change="newBook.genre = $event.target.value"
                label="Жанр"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col
            cols="12"
            md="12"
          >

            <v-text-field
              @change="newBook.description = $event.target.value"
              label="Описание"
              hide-details="auto"
            ></v-text-field>
          </v-col>

            <v-btn
              color="green-darken-1"
              variant="text"
              @click="closeCreateBookModal(true)"
            >
              Добавить
            </v-btn>
            <v-btn
              color="green-darken-1"
              variant="text"
              @click="closeCreateBookModal"
            >
              Отменить
            </v-btn>
          </v-form>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="openEditModalBook"
          width="800"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Редактировать книгу</span>
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
                  label="Название"
                  @change="currentBook.bookName = $event.target.value"
                  :model-value="currentBook.bookName"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="12"
            >
              <v-text-field
                  label="Автор"
                  @change="currentBook.author = $event.target.value"
                  :model-value="currentBook.author"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="12"
            >
              <v-text-field
                  @change="currentBook.genre = $event.target.value"
                  :model-value="currentBook.genre"
                  label="Жанр"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="12"
            >
              <v-text-field
                  @change="currentBook.description = $event.target.value"
                  :model-value="currentBook.description"
                  label="Описание"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                md="12"
            >
              <p> Люди</p>

              <v-list :items="currentBook.personId"
              >
                <v-list-item
                    v-for="(item, i) in currentBook.personId"
                    :key="i"
                    :value="item"
                    color="primary"
                    @click="deletePeoples(item.id)"
                >
                  <v-list-item-title > {{ item.id}} </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
            <v-btn
                color="green-darken-1"
                variant="text"
                @click="closeEditModal(currentBook.id, currentBook)"
            >
              Редактировать
            </v-btn>
            <v-btn
                color="error"
                variant="text"
                @click="closeEditModal(currentBook.id, [], true)"
            >
              удалить
            </v-btn>
            <v-btn
                color="green-darken-1"
                variant="text"
                @click="router.push(`/books/${currentBook.id}`)"
            >
              Перейти в книгу
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
