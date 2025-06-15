import { useReducer } from 'react'
import { createContext } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state,action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.payload // retorno lo que me llega
  case 'RESET_NOTIFICATION':
    return ''
  default:
    return state
  }
}
export const NotificationProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer,'') // Estado inicial vacio!
  return (
    <NotificationContext.Provider value={[
      notification,
      notificationDispatch
    ]}>
      { children }
    </NotificationContext.Provider>
  )
}
export default NotificationContext
