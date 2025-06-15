import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useContext } from 'react'
import UserContext from '../context/UserContext'
import { Alert, Box, Button, TextField } from '@mui/material'
export const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,userDispatch] = useContext( UserContext )
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password, // mando las credenciales de inicio de sesion
      }) // Nos devuelve el user

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user)) // guardo en local storage

      blogService.setToken(user.token) // seteo el token del usuario para poder crear un blog

      userDispatch({ type: 'SAVE_USER', payload: user }) // guardamos el user que trae el token, username y name
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }
  return (
    <div>
      {errorMessage !== null && (
        <Alert severity='error'>{errorMessage}</Alert>
      )}
      <form onSubmit={handleLogin}>
        <Box sx={{ display:'flex',flexDirection:'column', gap:2, marginBottom:2 }}>
          <label htmlFor='username'>Username</label>
          <TextField id='username' label='Usuario' type='text' value={username} name='Username' onChange={(e) => setUsername(e.target.value)} data-testid='username' variant='outlined' />
        </Box>
        <Box sx={{ display:'flex',flexDirection:'column', gap:2, marginBottom:2 }}>
          <label htmlFor='password'>Password</label>
          <TextField id='password' label='Contraseña' type='password' value={password} name='Password' onChange={(e) => setPassword(e.target.value)} data-testid='password' variant='outlined' />
        </Box>
        <Button type="submit" variant='outlined' data-testid='button_login'>login</Button>
      </form>
    </div>
  )
}
