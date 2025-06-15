import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import { getAllUsers } from '../request'
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

export const Users = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers
  })

  if(result.isLoading) {
    return <Typography>Cargando usuarios...</Typography>
  }
  if(result.isError) {
    return <Typography color="error">Error al obtener los usuarios</Typography>
  }

  const totalUsers = result.data

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>USERS</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="h6">Name</Typography></TableCell>
              <TableCell><Typography variant="h6">Blogs created</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {totalUsers.length > 0 ? (
              totalUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Typography
                      component={Link}
                      to={`/users/${user.id}`}
                    >
                      {user.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{user.blogs.length}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography>No hay usuarios</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
