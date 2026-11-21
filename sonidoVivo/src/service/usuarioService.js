import { api } from '../services/api';
import { crearUsuarioRequestDto, actualizarUsuarioRequestDto, normalizarUsuario } from '../dto/usuario.dto';

// Este service es la única capa que habla HTTP; no persiste contraseñas en localStorage.
export async function listarUsuarios(signal) {
  const respuesta = await api.get('/usuarios', { signal });
  return respuesta.data.map(normalizarUsuario);
}
export const obtenerUsuarios = listarUsuarios;

export async function obtenerUsuarioPorId(id) {
  const respuesta = await api.get(`/usuarios/${id}`);
  return normalizarUsuario(respuesta.data);
}
export async function obtenerUsuarioPorCorreo(correo) {
  const respuesta = await api.get(`/usuarios/email/${encodeURIComponent(correo)}`);
  return normalizarUsuario(respuesta.data);
}
export async function crearUsuario(datos) {
  const respuesta = await api.post('/usuarios', crearUsuarioRequestDto(datos));
  return normalizarUsuario(respuesta.data);
}
export const registrarUsuario = crearUsuario;

export async function autenticarUsuario(correo, contrasena) {
  const respuesta = await api.post('/auth/login', { correo: correo.trim().toLowerCase(), contrasena });
  const token = respuesta.data.token ?? respuesta.data.accessToken;
  if (!token) throw new Error('La API no entregó un token.');
  sessionStorage.setItem('sv_token', token);
  try {
    const perfil = await api.get('/auth/me');
    const usuario = normalizarUsuario(perfil.data);
    localStorage.setItem('sv_sesion', JSON.stringify(usuario));
    return { exito: true, usuario };
  } catch (error) {
    cerrarSesion();
    throw error;
  }
}
export async function actualizarUsuario(id, cambios) {
  const respuesta = await api.put(`/usuarios/${id}`, actualizarUsuarioRequestDto(cambios));
  return normalizarUsuario(respuesta.data);
}
export async function cambiarRolUsuario(id, rol) {
  const respuesta = await api.patch(`/usuarios/${id}/rol`, { rol: rol.toUpperCase() });
  return normalizarUsuario(respuesta.data);
}
export async function eliminarUsuario(id) {
  await api.delete(`/usuarios/${id}`); // 204: sin cuerpo
}
export function cerrarSesion() {
  sessionStorage.removeItem('sv_token');
  localStorage.removeItem('sv_sesion');
  localStorage.removeItem('usuarioSesion');
}
