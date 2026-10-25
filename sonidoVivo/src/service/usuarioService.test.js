import { describe, it, expect } from 'vitest'
import { 
  autenticarUsuario, 
  obtenerUsuarioPorCorreo, 
  obtenerUsuarioPorId 
} from './usuarioService'

describe('Servicio de Usuarios', () => {
  it('5. retorna exito false al intentar autenticar credenciales inexistentes', () => {
    const resultado = autenticarUsuario('noexiste@correo.cl', 'clavefalsa')
    expect(resultado.exito).toBe(false)
    expect(resultado.error).toBeDefined()
  })

  it('6. retorna null si no encuentra un usuario por su correo', () => {
    expect(obtenerUsuarioPorCorreo('falso@correo.cl')).toBeNull()
  })

  it('7. retorna null si se busca un ID de usuario inexistente', () => {
    expect(obtenerUsuarioPorId(999999)).toBeNull()
  })
})