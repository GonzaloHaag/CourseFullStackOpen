import axios from 'axios'
const baseUrl = '/api/users'
let token = null

const setToken = ( newToken ) => {
  token = `Bearer ${newToken}`
}
const getAll = async () => {
  const response = await axios.get( baseUrl )
  return response.data
}

const getUserById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, getUserById }