import {ref} from "vue";
import axios from "axios";

export const booksComp = () => {

  const books = ref([])
  const currentBook = ref({})

  const getBooks = async () => {
    books.value = await axios.get('/v1/books')
  }

  const getBook = async (id) => {
    currentBook.value = await axios.get(`/v1/books/${id}`)
  }

  const createBook = async (data) => {
    await axios.post(`/v1/books`, data)
    await getBooks()
  }

  const deleteBook = async (id) => {
     books.value = books.value.filter(el => el.id !== id)
     await axios.get(`/v1/books/${id}`)
  }

  const updateBook = async (id, data) => {
    await axios.patch(`/v1/books/${id}`, data)
    await getBooks()
  }

  return {
    updateBook,
    deleteBook,
    createBook,
    getBook,
    getBooks,
    currentBook,
    books,
  }
}
