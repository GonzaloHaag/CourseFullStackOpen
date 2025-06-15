import { useState, useContext  } from 'react'
import Blog from './Blog'
import { FormNewBlog } from './FormNewBlog'
import Togglable from './Togglabe'
import { getAllBlogs } from '../request'
import NotificationContext from '../context/NotificationContext'
import UserContext from '../context/UserContext'
import blogService from '../services/blogs'
import { useRef } from 'react'
import { useQueryClient,useQuery } from '@tanstack/react-query'
import { Alert, Typography } from '@mui/material'
export const HomePage = () => {
  const [titleBlog, setTitleBlog] = useState('')
  const [authorBlog, setAuthorBlog] = useState('')
  const [urlBlog, setUrlBlog] = useState('')

  const [notification, notificationDispatch] = useContext(NotificationContext)
  const [user,userDispatch] = useContext( UserContext )

  const formBlogRef = useRef()
  const queryClient = useQueryClient()
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getAllBlogs,
  })
  if (result.isError) {
    return <div>Occurrió un error al obtener los blogs</div>
  }

  const blogs = result.data
  // ORDEN DE MAYOR A MENOR
  const sortedBlogs = blogs?.slice().sort((a, b) => b.likes - a.likes) // slice crea una copia del array original!

  const createNewBlog = async (event) => {
    event.preventDefault()
    if (
      titleBlog.trim() === '' ||
      authorBlog.trim() === '' ||
      urlBlog.trim() === ''
    ) {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: 'Hay campos sin completar!',
      })
      setTimeout(() => {
        notificationDispatch({ type: 'RESET_NOTIFICATION' })
      }, 5000)
      return
    }
    const blogObject = {
      title: titleBlog,
      author: authorBlog,
      url: urlBlog,
    }
    formBlogRef.current.toggleVisibility() // Esconder el formulario luego de añadir un blog
    await blogService.createNewBlog(blogObject)
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: `a new blog You're NOT gonna need it! by ${user.username} added`,
    })
    setTimeout(() => {
      notificationDispatch({ type: 'RESET_NOTIFICATION' })
    }, 5000)
    // Invalidar query de blogs para que se actualice
    queryClient.invalidateQueries({
      queryKey: ['blogs'],
    })
    setTitleBlog('')
    setAuthorBlog('')
    setUrlBlog('')
  }
  return (
    <div>
      {notification !== '' && (
        <Alert severity='error'>{notification}</Alert>
      )}
      <div>
        <Typography variant='h3' sx={{ fontSize:20, marginBottom:2 }}>Create new</Typography>
        <Togglable
          buttonLabel='Create new blog'
          buttonLabelHide='Cancel'
          ref={formBlogRef}
        >
          <FormNewBlog
            createNewBlog={createNewBlog}
            titleBlog={titleBlog}
            handleTitleBlog={({ target }) => setTitleBlog(target.value)}
            authorBlog={authorBlog}
            handleAuthorBlog={({ target }) => setAuthorBlog(target.value)}
            urlBlog={urlBlog}
            handleUrlBlog={({ target }) => setUrlBlog(target.value)}
          />
        </Togglable>
        <Typography variant='h3' sx={{ fontSize:20,marginTop:2 }}>List blogs</Typography>
        {result.isLoading ? (
          <div>Cargando blogs...</div>
        ) : (
          sortedBlogs.map((blog) => <Blog key={blog.id} blog={blog} />)
        )}
      </div>
    </div>
  )
}
