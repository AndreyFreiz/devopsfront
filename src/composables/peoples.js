import {ref} from "vue";
import axios from "redaxios";

export const peoplesComp = () => {
  const peoples = ref([])
  const currentPeople = ref({})

  const getPeoples = async () => {
    peoples.value = await axios.get('/v1/peoples')
  }

  const getPeople = async (id) => {
    currentPeople.value = await axios.get(`/v1/peoples/${id}`)
  }

  const createPeople = async (data) => {
    await axios.post(`/v1/peoples`, data)
    await getPeoples()
  }

  const deletePeople = async (id) => {
    peoples.value = peoples.value.filter(el => el.id !== id)
    await axios.delete(`/v1/peoples/${id}`)
    await getPeoples()

  }

  const updatePeople = async (id, data) => {
    await axios.patch(`/v1/peoples/${id}`, data)
    await getPeoples()
  }

  return {
    updatePeople,
    deletePeople,
    createPeople,
    getPeople,
    getPeoples,
    peoples,
    currentPeople,


  }
}
