import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { LoginForm } from './components/LoginForm'
import { FormNewBlog } from './components/FormNewBlog'
import Togglable from './components/Togglabe'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [titleBlog,setTitleBlog] = useState('')
  const [authorBlog,setAuthorBlog] = useState('')
  const [urlBlog,setUrlBlog] = useState('')
  const [ alert,setAlert ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  const formBlogRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    /** Persistir sesion, si hay algo guardado con esa clave lo guardo en user */
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser') // pido al local storage lo que este con esa clave
    if(loggedUserJson) {
      const user = JSON.parse( loggedUserJson ) // parseamos
      setUser( user )
      blogService.setToken(user.token) // 👈🏽 IMPORTANTE: reestablecer token en el servicio
    }
  },[])

  console.log(user)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password // mando las credenciales de inicio de sesion
      }) // Nos devuelve el user

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user)) // guardo en local storage

      blogService.setToken(user.token) // seteo el token del usuario para poder crear un blog

      setUser(user) // guardamos el user que trae el token, username y name
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

  const closeSession = () => {
    window.localStorage.removeItem('loggedBlogAppUser') // Limpio el local storage para cerrar sesión
    setUser(null)
  }

  const createNewBlog = async (event) => {
    event.preventDefault()
    if(titleBlog.trim() === '' || authorBlog.trim() === '' || urlBlog.trim() === '') {
      window.alert('Hay campos que completar')
      return
    }
    const blogObject = {
      title: titleBlog,
      author: authorBlog,
      url: urlBlog
    }
    formBlogRef.current.toggleVisibility() // Esconder el formulario luego de añadir un blog
    const response = await blogService.createNewBlog( blogObject )
    setAlert(`a new blog You're NOT gonna need it! by ${user.username} added`)
    setTimeout(() => {
      setAlert(null)
    }, 5000)
    setBlogs(blogs.concat(response))
    setTitleBlog('')
    setAuthorBlog('')
    setAuthorBlog('')
  }

  // ORDEN DE MAYOR A MENOR
  blogs.sort((a,b) => b.likes - a.likes) // a y b son el objeto blog

  return (
    <div>
      <h2>blogs</h2>
      {
        alert !== null && (
          <div style={{ width:'80%', background:'#d6d6d6', border:'2px solid green', padding:'1.2rem', marginBottom:'1rem' }}>
            { alert }
          </div>
        )
      }
      {
        errorMessage !== null && (
          <div className='error' style={{ width:'80%', background:'#d6d6d6', border:'2px solid red', padding:'1.2rem', marginBottom:'1rem' }}>
            { errorMessage }
          </div>
        )
      }
      {
        user === null ? (
        // significa que no hay sesion
          <LoginForm
            handleLogin={ handleLogin }
            username={ username }
            handleUsername={({ target }) => setUsername(target.value)}
            password={ password }
            handlePassword={({ target }) => setPassword(target.value)}
          />
        ) : (
        // Significa que hay sesion, muestro el nombre de usuario y los blogs
          <div>
            <h2 className='user_logged'>{user.username} logged in</h2>
            <button data-testid="logout_button" type='button' onClick={ closeSession }>
             Cerrar sesión
            </button>
            <h3>Create new</h3>
            <Togglable buttonLabel="Create new blog" buttonLabelHide="Cancel" ref={formBlogRef}>
              <FormNewBlog
                createNewBlog={ createNewBlog }
                titleBlog={ titleBlog }
                handleTitleBlog={({ target }) => setTitleBlog(target.value)}
                authorBlog={ authorBlog }
                handleAuthorBlog={ ({ target }) => setAuthorBlog(target.value) }
                urlBlog={ urlBlog }
                handleUrlBlog={ ({ target }) => setUrlBlog(target.value) }
              />
            </Togglable>
            <h3>List blogs</h3>
            {
              blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
              )
            }
          </div>
        )
      }

    </div>
  )
}

export default App