import blogService from '../services/blogs'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router'
import { Card, CardContent, Button, Box, Typography } from '@mui/material'

const Blog = ({ blog }) => {
  const queryClient = useQueryClient()
  const deleteBlog = async () => {
    if(window.confirm(`Remove blog You're NOT gonna need it! by ${ blog.author }`)) {
      await blogService.deleteBlog( blog.id )
      queryClient.invalidateQueries({
        queryKey:['blogs']
      })
    }
  }
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography component={Link} to={`/blogs/${blog.id}`}>
            {blog.title} - {blog.author}
          </Typography>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={deleteBlog}
            data-testid="delete_blog_button"
          >
            Remove
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Blog