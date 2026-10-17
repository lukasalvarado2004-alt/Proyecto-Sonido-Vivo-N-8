// src/util/validaciones.js

export const validarNombre = (nombre) => {
  if (!nombre.trim()) {
    return "El nombre es obligatorio.";
  }
  if (nombre.trim().length < 3) {
    return "El nombre debe tener al menos 3 caracteres.";
  }
  return "";
};

export const validarCorreo = (correo) => {
  if (!correo.trim()) {
    return "El correo electrónico es obligatorio.";
  }
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(correo)) {
    return "Por favor, ingresa un correo electrónico válido.";
  }
  return "";
};

export const validarContrasena = (contrasena) => {
  if (!contrasena) {
    return "La contraseña es obligatoria.";
  }
  if (contrasena.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }
  return "";
};

export const validarConfirmarContrasena = (contrasena, confirmarContrasena) => {
  if (!confirmarContrasena) {
    return "Por favor, confirma tu contraseña.";
  }
  if (contrasena !== confirmarContrasena) {
    return "Las contraseñas no coinciden.";
  }
  return "";
};
