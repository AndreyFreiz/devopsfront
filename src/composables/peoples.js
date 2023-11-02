import {ref} from "vue";
import redaxios from "https://cdn.jsdelivr.net/npm/redaxios@0.5.1/+esm";

export const peoplesComp = () => {
  const peoples = ref([])
  const currentPeople = ref({})

  const getPeoples = async () => {
    peoples.value = await redaxios.get('/v1/peoples')
  }

  const getPeople = async (id) => {
    currentPeople.value = await redaxios.get(`/v1/peoples/${id}`)
  }

  const createPeople = async (data) => {
    await redaxios.post(`/v1/peoples`, data)
    await getPeoples()
  }

  const deletePeople = async (id) => {
    peoples.value = peoples.value.filter(el => el.id !== id)
    await redaxios.delete(`/v1/peoples/${id}`)
    await getPeoples()

  }

  const updatePeople = async (id, data) => {
    await redaxios.patch(`/v1/peoples/${id}`, data)
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
