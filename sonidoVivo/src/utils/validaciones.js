// src/utils/validaciones.js

// Validar nombre completo
export function validarNombre(nombre) {
  if (!nombre || !nombre.trim()) {
    return 'El nombre es obligatorio.';
  }
  if (nombre.trim().length < 3) {
    return 'El nombre debe tener al menos 3 caracteres.';
  }
  return '';
}

// Validar formato de correo electrónico
export function validarCorreo(correo) {
  if (!correo || !correo.trim()) {
    return 'El correo electrónico es obligatorio.';
  }
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexCorreo.test(correo.trim())) {
    return 'Ingresa un formato de correo válido (ej: usuario@dominio.cl).';
  }
  return '';
}

// Validar contraseña básica
export function validarContrasena(contrasena) {
  if (!contrasena || !contrasena.trim()) {
    return 'La contraseña es obligatoria.';
  }
  if (contrasena.trim().length < 3) {
    return 'La contraseña debe tener al menos 3 caracteres.';
  }
  return '';
}

// Validar confirmación de contraseña
export function validarConfirmarContrasena(contrasena, confirmarContrasena) {
  if (!confirmarContrasena || !confirmarContrasena.trim()) {
    return 'Debes confirmar la contraseña.';
  }
  if (contrasena !== confirmarContrasena) {
    return 'Las contraseñas no coinciden.';
  }
  return '';
}

// Validar si el correo existe en la lista de usuarios guardados
export function validarExisteUsuario(correo, listaUsuarios) {
  const usuarioEncontrado = listaUsuarios.find(
    (u) => u.correo.toLowerCase() === correo.trim().toLowerCase()
  );

  if (!usuarioEncontrado) {
    return {
      existe: false,
      error: 'Esta cuenta no existe. Por favor regístrate primero.',
      usuario: null
    };
  }

  return {
    existe: true,
    error: '',
    usuario: usuarioEncontrado
  };
}

// Validar si la contraseña coincide con la cuenta encontrada
export function validarPasswordUsuario(contrasena, usuario) {
  if (!usuario) return 'Usuario no válido.';

  const claveCorrecta =
    usuario.password === contrasena || usuario.contrasena === contrasena;

  if (!claveCorrecta) {
    return 'Contraseña incorrecta.';
  }

  return '';
}

// Validaciones para formularios de productos (CRUD)
export function validarCodigo(codigo) {
  if (!codigo || !codigo.trim()) return 'El código es obligatorio.';
  return '';
}

export function validarCategoria(categoria) {
  if (!categoria || !categoria.trim()) return 'Selecciona o ingresa una categoría.';
  return '';
}

export function validarNumero(valor, nombreCampo = 'El campo', min = 0) {
  if (valor === '' || valor === null || valor === undefined) {
    return `${nombreCampo} es obligatorio.`;
  }
  const num = Number(valor);
  if (isNaN(num)) {
    return `${nombreCampo} debe ser un número válido.`;
  }
  if (num < min) {
    return `${nombreCampo} debe ser mayor o igual a ${min}.`;
  }
  return '';
}