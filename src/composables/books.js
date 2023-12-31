import {ref} from "vue";
import redaxios from "https://cdn.jsdelivr.net/npm/redaxios@0.5.1/+esm";
import {baseUrl} from "@/baseUrl";


export const booksComp = () => {

  const books = ref([])
  const currentBook = ref({})

  const getBooks = async () => {
     const {data}  = await redaxios.get({url: '/v1/books', baseURL: baseUrl})
    books.value = data
  }

  const getBook = async (id) => {
    const {data}  = await redaxios.get({url: `/v1/books/${id}`, baseURL: baseUrl})
    currentBook.value = data
  }

  const createBook = async (data) => {
    await redaxios.post({url: `/v1/books`, data: data, baseURL: baseUrl})
    await getBooks()
  }

  const deleteBook = async (id) => {
     books.value = books.value.filter(el => el.id !== id)
     await redaxios.get({url: `/v1/books/${id}`, baseURL: baseUrl})
  }

  const updateBook = async (id, data) => {
    await redaxios.patch({url: `/v1/books/${id}`, data: data, baseURL: baseUrl})
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
