import { useReducer } from 'react'
import { createContext } from 'react'

const UserContext = createContext()


const userReducer = (state,action) => {
  switch(action.type) {
  case 'SAVE_USER':
    return action.payload // Voy a recibir el usuario, lo retorno

  case 'CLOSE_SESSION':
    return null
  default:
    return state
  }
}


export const UserProvider = ({ children }) => {
  const [user,userDispatch] = useReducer(userReducer,null) // estado inicial en null el user
  return (
    <UserContext.Provider value={[
      user,
      userDispatch
    ]}>
      { children }
    </UserContext.Provider>
  )
}

export default UserContext