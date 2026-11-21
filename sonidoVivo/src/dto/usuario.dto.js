// Los nombres corresponden al contrato Spring Boot, no a los campos de React.
export function crearUsuarioRequestDto(formulario) {
  return {
    nombre: formulario.nombre.trim(),
    correo: formulario.correo.trim().toLowerCase(),
    contrasena: formulario.contrasena,
    telefono: formulario.telefono.trim(),
    direccion: formulario.direccion.trim(),
  };
}
export function actualizarUsuarioRequestDto(formulario) {
  return {
    nombre: formulario.nombre.trim(),
    telefono: formulario.telefono.trim(),
    direccion: formulario.direccion.trim(),
  };
}
export function normalizarUsuario(datos) {
  return { ...datos, correo: datos.email ?? datos.correo, rol: (datos.rol || 'CLIENTE').toLowerCase() };
}
