// src/service/usuarioService.js
import usuariosIniciales from '../data/Usuarios.json';

const CLAVE = 'usuarios';

function leer() {
  const guardado = localStorage.getItem(CLAVE);
  if (guardado === null) {
    localStorage.setItem(CLAVE, JSON.stringify(usuariosIniciales));
    return [...usuariosIniciales];
  }
  return JSON.parse(guardado);
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

export function listarUsuarios() {
  return leer();
}

export function obtenerUsuarioPorId(id) {
  return leer().find((u) => Number(u.id) === Number(id)) ?? null;
}

export function obtenerUsuarioPorCorreo(correo) {
  return leer().find(
    (u) => (u.correo || u.email)?.toLowerCase() === correo?.toLowerCase()
  ) ?? null;
}

// --- FUNCIÓN REQUERIDA POR LOGIN.JSX ---
export function autenticarUsuario(correo, contrasena) {
  const lista = leer();
  const usuarioEncontrado = lista.find(
    (u) => 
      ((u.correo || u.email)?.toLowerCase() === correo?.trim().toLowerCase()) && 
      ((u.contrasena || u.password) === contrasena?.trim())
  );
  return usuarioEncontrado || null;
}

export function crearUsuario(datos) {
  const lista = leer();
  const nuevoId = Math.max(0, ...lista.map((u) => Number(u.id || 0))) + 1;
  const nuevo = { ...datos, id: nuevoId };
  guardar([...lista, nuevo]);
  return nuevo;
}

export function actualizarUsuario(id, cambios) {
  const lista = leer().map((u) => (Number(u.id) === Number(id) ? { ...u, ...cambios } : u));
  guardar(lista);
  return lista.find((u) => Number(u.id) === Number(id)) ?? null;
}