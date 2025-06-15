import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = ( newToken ) => {
  token = `Bearer ${newToken}`
}
const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getBlogById = async(id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createCommentBlog = async(id,comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`,{ comment })
  return response.data
}

const createNewBlog = async ( newBlog ) => {
  /** Necesito pasar el token */
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl,newBlog,config) // Mando el Authorization y el nuevo blog

  return response.data // devuelvo el blog creado !
}

const updateBlog = async ( idBlog,blogUpdate ) => {
  /** Necesito pasar el token */
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${idBlog}`,blogUpdate,config)

  return response.data
}

const deleteBlog = async ( idBlog ) => {
  /** Necesito pasar el token */
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${idBlog}`,config)
}
export default { getAll, setToken, createNewBlog, updateBlog, deleteBlog, getBlogById, createCommentBlog }