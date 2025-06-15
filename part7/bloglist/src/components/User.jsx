import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { getUserById } from '../request'
import { Typography, Paper, List, ListItem, Box } from '@mui/material'

export const User = () => {
  const params = useParams()
  const result = useQuery({
    queryKey: [`user_${params.id.toString()}`],
    queryFn: () => getUserById(params.id.toString()),
    retry: false
  })

  if(result.isLoading) {
    return <Typography>Cargando usuario...</Typography>
  }
  if(result.isError) {
    return <Typography color="error">Usuario no encontrado</Typography>
  }

  const user = result.data

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4">{user.name}</Typography>
        <Typography variant="h5">Added blogs</Typography>
        <List>
          {user.blogs.map((blog) => (
            <ListItem key={blog.id}>
              <Typography>{blog.title}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  )
}
