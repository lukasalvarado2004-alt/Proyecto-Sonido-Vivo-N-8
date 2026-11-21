import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Error from './Error'

describe('Componente Átomo: Error', () => {
  it('10. muestra el mensaje de error cuando se recibe por propiedad', () => {
    render(<Error mensaje="Credenciales incorrectas" variante="danger" />)
    expect(screen.getByText('Credenciales incorrectas')).toBeInTheDocument()
  })
})