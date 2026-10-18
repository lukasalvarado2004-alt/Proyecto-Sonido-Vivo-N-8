// src/utils/validaciones.js

// --- VALIDACIONES DE USUARIO ---
export function validarNombre(nombre) {
  if (!nombre || !nombre.trim()) return 'El nombre es obligatorio.';
  if (nombre.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres.';
  return '';
}

export function validarCorreo(correo) {
  if (!correo || !correo.trim()) return 'El correo electrónico es obligatorio.';
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexCorreo.test(correo.trim())) return 'Ingresa un formato de correo válido.';
  return '';
}

export function validarContrasena(contrasena) {
  if (!contrasena || !contrasena.trim()) return 'La contraseña es obligatoria.';
  if (contrasena.trim().length < 3) return 'La contraseña debe tener al menos 3 caracteres.';
  return '';
}

export function validarConfirmarContrasena(contrasena, confirmarContrasena) {
  if (!confirmarContrasena || !confirmarContrasena.trim()) return 'Debes confirmar la contraseña.';
  if (contrasena !== confirmarContrasena) return 'Las contraseñas no coinciden.';
  return '';
}

// --- VALIDACIONES DE PRODUCTO Y STOCK ---
export function validarCodigo(codigo) {
  if (!codigo || !codigo.trim()) return 'El código es obligatorio.';
  return '';
}

export function validarCategoria(categoria) {
  if (!categoria || !categoria.trim()) return 'Selecciona una categoría.';
  return '';
}

export function validarMarca(marca) {
  if (!marca || !marca.trim()) return 'La marca es obligatoria.';
  return '';
}

export function validarModelo(modelo) {
  if (!modelo || !modelo.trim()) return 'El modelo es obligatorio.';
  return '';
}

export function validarDescripcion(descripcion) {
  if (!descripcion || !descripcion.trim()) return 'La descripción es obligatoria.';
  if (descripcion.trim().length < 5) return 'La descripción debe tener al menos 5 caracteres.';
  return '';
}

export function validarImagen(imagen) {
  if (!imagen || !imagen.trim()) return 'Debes subir una imagen o ingresar una URL.';
  return '';
}

export function validarNumero(valor, nombreCampo = 'El campo', min = 0) {
  if (valor === '' || valor === null || valor === undefined) {
    return `${nombreCampo} es obligatorio.`;
  }
  const num = Number(valor);
  if (isNaN(num)) return `${nombreCampo} debe ser un número válido.`;
  if (num < min) return `${nombreCampo} debe ser mayor o igual a ${min}.`;
  return '';
}

export function validarStock(stock) {
  return validarNumero(stock, 'El stock', 0);
}
export function validarRol(rol) {
  if (!rol || !rol.trim()) return 'Selecciona un rol para el usuario.';
  const rolNormalizado = rol.trim().toLowerCase();
  if (rolNormalizado !== 'admin' && rolNormalizado !== 'cliente') {
    return 'El rol solo puede ser "admin" o "cliente".';
  }
  return '';
}