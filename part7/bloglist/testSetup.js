import { afterEach } from 'vitest' // Vitest para pruebas
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

/** Sirve para que luego de ejecutar cada prueba, se vuelva a ejecutar el servicio de jsdom que esta
 * simulando el navegador
 */
afterEach(() => {
  cleanup()
})