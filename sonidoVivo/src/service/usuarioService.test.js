import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../services/api', () => ({ api: {
  get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn(),
}}));

import { api } from '../services/api';
import { autenticarUsuario, listarUsuarios, eliminarUsuario } from './usuarioService';

beforeEach(() => { vi.clearAllMocks(); sessionStorage.clear(); localStorage.clear(); });

describe('Servicio de Usuarios con Axios', () => {
  it('lista usuarios desde la API y convierte email a correo', async () => {
    api.get.mockResolvedValue({ data: [{ id: 1, email: 'cliente@test.cl', rol: 'CLIENTE' }] });
    const usuarios = await listarUsuarios();
    expect(api.get).toHaveBeenCalledWith('/usuarios', { signal: undefined });
    expect(usuarios[0].correo).toBe('cliente@test.cl');
  });
  it('guarda el token al autenticar y consulta el perfil', async () => {
    api.post.mockResolvedValue({ data: { token: 'token-prueba' } });
    api.get.mockResolvedValue({ data: { id: 1, nombre: 'Prueba', email: 'test@correo.cl', rol: 'CLIENTE' } });
    const resultado = await autenticarUsuario('test@correo.cl', 'clave-segura');
    expect(resultado.exito).toBe(true);
    expect(sessionStorage.getItem('sv_token')).toBe('token-prueba');
  });
  it('elimina mediante DELETE sin exigir cuerpo', async () => {
    api.delete.mockResolvedValue({ status: 204 });
    await eliminarUsuario(2);
    expect(api.delete).toHaveBeenCalledWith('/usuarios/2');
  });
});
