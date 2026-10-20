// src/service/usuarioService.js
import usuariosIniciales from '../data/Usuarios.json';

const CLAVE = 'usuarios';

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

export function listarUsuarios() {
  return leer();
}

export function obtenerUsuarioPorId(id) {
  return leer().find((u) => Number(u.id) === Number(id)) ?? null;
}

export function obtenerUsuarioPorCorreo(correo) {
  return leer().find(
    (u) => (u.correo || u.email)?.toLowerCase() === correo?.trim().toLowerCase()
  ) ?? null;
}

// --- FUNCIÓN REQUERIDA POR LOGIN.JSX ---
export function autenticarUsuario(correo, contrasena) {
  const lista = leer();
  const correoBuscado = correo?.trim().toLowerCase();
  const claveBuscada = contrasena?.trim();

  const usuarioEncontrado = lista.find(
    (u) => 
      ((u.correo || u.email)?.toLowerCase() === correoBuscado) && 
      ((u.contrasena || u.password || u.clave) === claveBuscada)
  );

  if (usuarioEncontrado) {
    return {
      exito: true,
      usuario: usuarioEncontrado
    };
  }

  return {
    exito: false,
    error: 'Correo o contraseña incorrectos. Por favor reintenta.'
  };
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