import {ref} from "vue";
import redaxios from "https://cdn.jsdelivr.net/npm/redaxios@0.5.1/+esm";

export const booksComp = () => {

  const books = ref([])
  const currentBook = ref({})

  const getBooks = async () => {
    books.value = await redaxios.get('/v1/books')
  }

  const getBook = async (id) => {
    currentBook.value = await redaxios.get(`/v1/books/${id}`)
  }

  const createBook = async (data) => {
    await redaxios.post(`/v1/books`, data)
    await getBooks()
  }

  const deleteBook = async (id) => {
     books.value = books.value.filter(el => el.id !== id)
     await redaxios.get(`/v1/books/${id}`)
  }

  const updateBook = async (id, data) => {
    await redaxios.patch(`/v1/books/${id}`, data)
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
