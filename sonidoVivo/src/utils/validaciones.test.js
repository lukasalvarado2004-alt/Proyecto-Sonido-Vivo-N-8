import { describe, it, expect } from 'vitest'
import { validarCorreo, validarContrasena } from './validaciones'

describe('Validaciones de Formulario', () => {
  //  TEST FALLIDO
  it('1. retorna mensaje de error si el correo no incluye @', () => {
  
    expect(validarCorreo('correo-invalido')).toBe('El correo esta mal')
  })

  it('2. retorna texto vacio si el correo es valido', () => {
    expect(validarCorreo('juan@correo.cl')).toBe('')
  })

  it('3. retorna mensaje de error si la contraseña esta vacia', () => {
    expect(validarContrasena('')).not.toBe('')
  })

  it('4. retorna texto vacio si la contraseña es valida', () => {
    expect(validarContrasena('123456')).toBe('')
  })
})