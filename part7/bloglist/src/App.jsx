import { useEffect } from 'react'
import blogService from './services/blogs'
import { useContext } from 'react'
import UserContext from './context/UserContext'
import { Routes, BrowserRouter, Route, Link } from 'react-router'
import { HomePage } from './components/HomePage'
import { Users } from './components/Users'
import { LoginForm } from './components/LoginForm'
import { User } from './components/User'
import { BlogPage } from './components/BlogPage'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'

const App = () => {
  const [user,userDispatch] = useContext( UserContext )
  console.log( user )
  useEffect(() => {
    /** Persistir sesion, si hay algo guardado con esa clave lo guardo en user */
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser') // pido al local storage lo que este con esa clave
    if(loggedUserJson) {
      const user = JSON.parse( loggedUserJson ) // parseamos
      userDispatch({ type: 'SAVE_USER', payload: user })
      blogService.setToken(user.token) // 👈🏽 IMPORTANTE: reestablecer token en el servicio
    }
  },[])
  const closeSession = () => {
    window.localStorage.removeItem('loggedBlogAppUser') // Limpio el local storage para cerrar sesión
    userDispatch({ type: 'CLOSE_SESSION' })
  }

  return (
    <Container>
      <BrowserRouter>
        <AppBar position='static'>
          <Toolbar disableGutters>
            <Button color='inherit' component={Link} to='/'>
              Blogs
            </Button>
            <Button color='inherit' component={Link} to='/users'>
              Users
            </Button>
            {user && (
              <Box sx={{ display:'flex', alignItems:'center' }}>
                <Typography variant='h2' sx={{ fontSize:'14px' }}>{user.username} logged in</Typography>
                <Button
                  variant='inherit'
                  data-testid='logout_button'
                  type='button'
                  onClick={closeSession}
                  sx={{ display:'flex', ml:1 }}
                >
            Cerrar sesión
                </Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>
        <Typography variant='h2' sx={{ fontSize:24,marginTop:2,marginBottom:2 }}>blogs</Typography>
        <Routes>
          <Route path='/' element={ user ? <HomePage /> : <LoginForm /> } />
          <Route path='/users' element={user ? <Users /> : <LoginForm />} />
          <Route path='/users/:id' element={user ? <User /> : <LoginForm />} />
          <Route path='/blogs/:id' element={user ? <BlogPage /> : <LoginForm />} />
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App