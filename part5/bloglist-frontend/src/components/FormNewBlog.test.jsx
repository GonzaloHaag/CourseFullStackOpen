import { render, screen, fireEvent } from '@testing-library/react'
import { FormNewBlog } from './FormNewBlog'
import userEvent from '@testing-library/user-event'

/** Haz una prueba para el nuevo formulario de blog.
 * La prueba debe verificar que el formulario llama al controlador de eventos que recibió
 * como props con los detalles correctos cuando se crea un nuevo blog. */
test('El formulario llama al controlador con los datos correctos al crear un nuevo blog', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  const mockProps = {
    titleBlog: '',
    authorBlog: '',
    urlBlog: '',
    handleTitleBlog: vi.fn(),
    handleAuthorBlog: vi.fn(),
    handleUrlBlog: vi.fn(),
    createNewBlog: (e) => {
      e.preventDefault()
      createBlog({
        title: 'Mi Blog de Prueba',
        author: 'Juan Tester',
        url: 'https://testblog.com'
      })
    }
  }

  render(<FormNewBlog {...mockProps} />)

  const inputTitle = screen.getByPlaceholderText('Titulo del blog')
  const inputAuthor = screen.getByPlaceholderText('Author del blog')
  const inputUrl = screen.getByPlaceholderText('Url del blog')
  const submitButton = screen.getByText('Create')

  await user.type(inputTitle, 'Mi Blog de Prueba')
  await user.type(inputAuthor, 'Juan Tester')
  await user.type(inputUrl, 'https://testblog.com')
  await user.click(submitButton)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'Mi Blog de Prueba',
    author: 'Juan Tester',
    url: 'https://testblog.com'
  })
})
