/** Servicio encargado del login */
import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data // nuestro backend devuelve las credenciales con el token
  /** Ejemplo de la respuesta
   * {
    "token": "",
    "username": "",
    "name": ""
    }
   */
}

export default { login }