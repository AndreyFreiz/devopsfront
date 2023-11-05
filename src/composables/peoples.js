import {ref} from "vue";
import redaxios from "https://cdn.jsdelivr.net/npm/redaxios@0.5.1/+esm";
import {baseUrl} from "@/baseUrl";

export const peoplesComp = () => {
  const peoples = ref([])
  const currentPeople = ref({})

  const getPeoples = async () => {
    peoples.value = await redaxios.get({ url: '/v1/peoples', baseURL: baseUrl})
  }

  const getPeople = async (id) => {
    currentPeople.value = await redaxios.get({url: `/v1/peoples/${id}`, baseURL: baseUrl})
  }

  const createPeople = async (data) => {
    await redaxios.post({url: `/v1/peoples`, data: data, baseURL: baseUrl})
    await getPeoples()
  }

  const deletePeople = async (id) => {
    peoples.value = peoples.value.filter(el => el.id !== id)
    await redaxios.delete({url: `/v1/peoples/${id}`, baseURL: baseUrl})
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
