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

export function obtenerUsuarioPorCorreo(correo) {
  const correoLimpio = (correo || '').trim().toLowerCase();
  return leer().find((u) => (u.correo || '').trim().toLowerCase() === correoLimpio) ?? null;
}

export function crearUsuario(datos) {
  const lista = leer();
  const nuevoId = Math.max(0, ...lista.map((u) => Number(u.id || 0))) + 1;
  
  const nuevo = {
    id: nuevoId,
    nombre: datos.nombre.trim(),
    correo: datos.correo.trim().toLowerCase(),
    password: datos.password.trim(),
    rol: datos.rol || 'Cliente'
  };

  guardar([...lista, nuevo]);
  return nuevo;
}

export function autenticarUsuario(correo, contrasena) {
  const usuario = obtenerUsuarioPorCorreo(correo);

  // 1. Si no existe el usuario
  if (!usuario) {
    return {
      exito: false,
      campo: 'correo',
      error: 'Esta cuenta no está registrada.'
    };
  }

  // 2. Comprobar contraseña
  const claveGuardada = (usuario.password || usuario.contrasena || '').toString().trim();
  const claveIngresada = (contrasena || '').toString().trim();

  if (claveGuardada !== claveIngresada) {
    return {
      exito: false,
      campo: 'contrasena',
      error: 'Contraseña incorrecta.'
    };
  }

  // 3. Credenciales correctas
  return {
    exito: true,
    usuario
  };
}