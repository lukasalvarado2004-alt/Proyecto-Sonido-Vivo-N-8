import usuariosIniciales from '../data/Usuarios.json';

const CLAVE_STORAGE = 'usuarios';
const CLAVE_SESION = 'sv_sesion';

function leer() {
  const guardado = localStorage.getItem(CLAVE_STORAGE);

  if (!guardado) {
    const listaJSON = Array.isArray(usuariosIniciales) ? usuariosIniciales : [];
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(listaJSON));
    return [...listaJSON];
  }

  try {
    const listaLocal = JSON.parse(guardado);
    return Array.isArray(listaLocal) ? listaLocal : [];
  } catch (e) {
    return Array.isArray(usuariosIniciales) ? usuariosIniciales : [];
  }
}

function guardar(lista) {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(lista));
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

export function autenticarUsuario(correo, contrasena) {
  const usuarios = leer();
  const correoLimpio = (correo || '').trim().toLowerCase();

  const usuarioEncontrado = usuarios.find((u) => {
    const correoUsuario = (u.correo || u.email || '').trim().toLowerCase();
    const claveUsuario = String(u.password || u.contrasena || '');
    return correoUsuario === correoLimpio && claveUsuario === String(contrasena);
  });

  if (!usuarioEncontrado) {
    return { exito: false, error: 'Correo o contraseña incorrectos. Por favor reintenta.' };
  }

  localStorage.setItem(CLAVE_SESION, JSON.stringify(usuarioEncontrado));
  return { exito: true, usuario: usuarioEncontrado };
}

export function crearUsuario(datos) {
  const lista = leer();
  const nuevoId = Math.max(0, ...lista.map((u) => Number(u.id || 0))) + 1;
  const nuevo = {
    id: nuevoId,
    nombre: datos.nombre,
    correo: datos.correo,
    password: datos.password || datos.contrasena,
    rol: datos.rol || 'cliente'
  };

  const listaActualizada = [...lista, nuevo];
  guardar(listaActualizada);
  return nuevo;
}

export function actualizarUsuario(id, cambios) {
  const lista = leer().map((u) => (Number(u.id) === Number(id) ? { ...u, ...cambios } : u));
  guardar(lista);
  return lista.find((u) => Number(u.id) === Number(id)) ?? null;
}

export function eliminarUsuario(id) {
  const lista = leer().filter((u) => Number(u.id) !== Number(id));
  guardar(lista);
  return true;
}

export function registrarUsuario(nuevoUsuario) {
  const usuarios = leer();
  const correoNuevo = (nuevoUsuario.correo || nuevoUsuario.email || '').trim().toLowerCase();

  const existe = usuarios.some((u) => (u.correo || u.email || '').trim().toLowerCase() === correoNuevo);

  if (existe) {
    return { exito: false, error: 'El correo ya se encuentra registrado.' };
  }

  const usuarioCreado = {
    id: Date.now(),
    nombre: nuevoUsuario.nombre,
    correo: correoNuevo,
    password: nuevoUsuario.password || nuevoUsuario.contrasena,
    rol: nuevoUsuario.rol || 'cliente'
  };

  guardar([...usuarios, usuarioCreado]);
  return { exito: true, usuario: usuarioCreado };
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
  localStorage.removeItem('usuarioSesion');
}