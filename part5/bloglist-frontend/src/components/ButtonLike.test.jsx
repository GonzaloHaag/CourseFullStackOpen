/** Realiza una prueba que garantice que si se hace clic dos veces en el botón like,
 * se llama dos veces al controlador de eventos que el componente recibió como props. */
import { render, screen } from '@testing-library/react'
import { ButtonLike } from './ButtonLike'
import userEvent from '@testing-library/user-event'
test('llama al controlador de eventos dos veces al hacer click dos veces', async () => {
  const mockHandleLike = vi.fn()
  render(<ButtonLike handleLike={mockHandleLike} />)
  const user = userEvent.setup()
  const button = screen.getByText('Like')
  await user.click(button)
  await user.click(button)
  expect(mockHandleLike).toHaveBeenCalledTimes(2) // que se ejecute dos veces
})