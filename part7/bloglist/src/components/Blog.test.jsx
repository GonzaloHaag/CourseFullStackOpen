/** Pruebas para el componente de Blog */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event' // para controlar eventos como onClick
import Blog from './Blog' // componente blog
/**
 * 1. Realiza una prueba que verifique que el componente que muestra un blog
 * muestre el título y el autor del blog, pero no muestre su URL o el número de likes por defecto
 */
test('render blog: muestra título y autor pero NO url ni likes por defecto', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Gonzalinho Haag',
    url: 'www.urlprueba.com',
    likes: 89,
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog') // Selecciono el div que contiene al blog
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library' // titulo blog
  )
  expect(div).toHaveTextContent(
    'Gonzalinho Haag' // author blog
  )
  // Validamos que NO se muestren la URL ni los likes en el documento
  expect(screen.queryByText('www.urlprueba.com')).toBeNull()
  expect(screen.queryByText(/likes/i)).toBeNull()
})

/** 2.Realiza una prueba que verifique que la URL del blog y
 * el número de likes se muestran cuando se hace clic en el botón que controla los detalles mostrados. */
test('render blog: mostrar url y likes cuando se hace click en el boton', async() => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Gonzalinho Haag',
    url: 'www.urlprueba.com',
    likes: 89,
  }

  render(<Blog blog={ blog } />)

  const user = userEvent.setup() // Inicio de sesion
  const button = screen.getByText('View') // Obtengo el boton
  await user.click(button)

  // Debe mostrarse la url y los likes
  expect(screen.getByText('www.urlprueba.com')).toBeDefined()
  expect(screen.getByText('likes 89')).toBeDefined()
})
