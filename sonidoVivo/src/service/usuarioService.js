// src/service/usuarioService.js
import usuariosIniciales from '../data/Usuarios.json';

const CLAVE = 'usuarios';

// Función auxiliar para leer y sincronizar usuarios desde localStorage y Usuarios.json
function leer() {
  const guardado = localStorage.getItem(CLAVE);
  const listaJSON = Array.isArray(usuariosIniciales) ? usuariosIniciales : [];

  if (!guardado) {
    localStorage.setItem(CLAVE, JSON.stringify(listaJSON));
    return [...listaJSON];
  }

  try {
    const listaLocal = JSON.parse(guardado);

    // Unificar usuarios de Usuarios.json con localStorage por correo para incorporar nuevas cuentas
    const mapa = new Map();
    listaJSON.forEach((u) => {
      const correo = (u.correo || u.email || '').trim().toLowerCase();
      if (correo) mapa.set(correo, u);
    });
    listaLocal.forEach((u) => {
      const correo = (u.correo || u.email || '').trim().toLowerCase();
      if (correo) mapa.set(correo, u);
    });

    const listaUnificada = Array.from(mapa.values());
    localStorage.setItem(CLAVE, JSON.stringify(listaUnificada));
    return listaUnificada;
  } catch (e) {
    return [...listaJSON];
  }
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

export function obtenerUsuarios() {
  return leer();
}

export function listarUsuarios() {
  return leer();
}

export function obtenerUsuarioPorId(id) {
  return leer().find((u) => Number(u.id) === Number(id)) ?? null;
}

export function obtenerUsuarioPorCorreo(correo) {
  const correoBuscado = (correo || '').trim().toLowerCase();
  return leer().find(
    (u) => (u.correo || u.email || '').toLowerCase() === correoBuscado
  ) ?? null;
}

// --- FUNCIÓN REQUERIDA POR LOGIN.JSX ---
export function autenticarUsuario(email, contrasena) {
  const usuarios = leer();
  const emailLimpio = (email || '').trim().toLowerCase();

  const usuarioEncontrado = usuarios.find((u) => {
    const correoUsuario = (u.email || u.correo || '').trim().toLowerCase();
    return correoUsuario === emailLimpio && String(u.contrasena) === String(contrasena);
  });

  if (!usuarioEncontrado) {
    return { exito: false, error: 'Correo o contraseña incorrectos. Por favor reintenta.' };
  }

  // Guardar sesión activa en ambas claves para compatibilidad
  localStorage.setItem('sv_sesion', JSON.stringify(usuarioEncontrado));
  localStorage.setItem('usuarioSesion', JSON.stringify(usuarioEncontrado));

  return { exito: true, usuario: usuarioEncontrado };
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

export function registrarUsuario(nuevoUsuario) {
  const usuarios = leer();
  const emailNuevo = (nuevoUsuario.email || nuevoUsuario.correo || '').trim().toLowerCase();

  const existe = usuarios.some((u) => {
    const correoUsuario = (u.email || u.correo || '').trim().toLowerCase();
    return correoUsuario === emailNuevo;
  });

  if (existe) {
    return { exito: false, error: 'El correo ya se encuentra registrado.' };
  }

  const usuarioCreado = {
    id: Date.now(),
    ...nuevoUsuario,
    rol: nuevoUsuario.rol || 'cliente'
  };

  const listaActualizada = [...usuarios, usuarioCreado];
  guardar(listaActualizada);

  return { exito: true, usuario: usuarioCreado };
}

export function cerrarSesion() {
  localStorage.removeItem('sv_sesion');
  localStorage.removeItem('usuarioSesion');
}