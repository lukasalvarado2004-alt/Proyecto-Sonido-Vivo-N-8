import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Boton from './Boton'

describe('Componente Atom: Boton', () => {
  it('7. renderiza y muestra el texto del boton correctamente', () => {
    render(<Boton textoBoton="INICIAR SESIÓN" variante="purple" />)
    expect(screen.getByText('INICIAR SESIÓN')).toBeInTheDocument()
  })

  it('8. ejecuta la funcion de evento al hacer clic', async () => {
    const alHacerClicMock = vi.fn()
    render(<Boton textoBoton="Guardar" alHacerClic={alHacerClicMock} />)
    
    await userEvent.click(screen.getByRole('button', { name: /guardar/i }))
    expect(alHacerClicMock).toHaveBeenCalledTimes(1)
  })
})