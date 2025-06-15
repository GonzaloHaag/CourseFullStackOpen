import { useParams } from 'react-router'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createComment, getBlogById } from '../request'
import { ButtonLike } from './ButtonLike'
import blogService from '../services/blogs'
import { Box, Typography, TextField, Button, List, ListItem, Paper, Link } from '@mui/material'

export const BlogPage = () => {
  const params = useParams()
  const queryClient = useQueryClient()
  const result = useQuery({
    queryKey: [`blog_${params.id}`],
    queryFn: () => getBlogById(params.id.toString()),
    retry: false
  })
  if(result.isLoading) {
    return <Typography>Cargando blog...</Typography>
  }
  if(result.isError) {
    return <Typography color="error">Blog no encontrado</Typography>
  }

  const blog = result.data

  const handleLike = async () => {
    try {
      const updatedBlog = {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }
      await blogService.updateBlog(blog.id, updatedBlog)
      queryClient.invalidateQueries({
        queryKey:[`blog_${params.id}`]
      })
    } catch (error) {
      console.error('Error al dar like:', error)
    }
  }

  const addComment = async (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    if(comment.trim() === '') {
      alert('El comentario es requerido')
      return
    }
    await createComment(params.id.toString(),comment)
    queryClient.invalidateQueries({
      queryKey:[`blog_${params.id}`]
    })
    e.target.comment.value = ''
  }

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4">{blog.title}</Typography>
        <Link href={`https://${blog.url}`} target="_blank" rel="noreferrer">
          {blog.url}
        </Link>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography data-testid="likes_text">likes {blog.likes}</Typography>
          <ButtonLike handleLike={handleLike} />
        </Box>
        <Typography>added by {blog.user.name}</Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Comments</Typography>
          <form onSubmit={addComment}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                name="comment"
                placeholder="Comentario"
                size="small"
              />
              <Button type="submit" variant="contained" size='small'>
                add comment
              </Button>
            </Box>
          </form>
          <List>
            {blog.comments.map((c, i) => (
              <ListItem key={i}>
                <Typography>{c}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Paper>
  )
}
