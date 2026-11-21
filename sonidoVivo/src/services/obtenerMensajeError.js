export function obtenerMensajeError(error) {
  if (error.response) {
    const datos = error.response.data;
    if (datos && typeof datos.mensaje === 'string') {
      const detalles = Array.isArray(datos.detalles) ? datos.detalles.join(' ') : '';
      return datos.mensaje + (detalles ? ' ' + detalles : '');
    }
    if (error.response.status === 401) return 'Credenciales incorrectas o sesión vencida. Inicia sesión nuevamente.';
    if (error.response.status === 403) return 'No tienes permisos para realizar esta operación.';
    return `La API respondió con un error (${error.response.status}).`;
  }
  if (error.code === 'ECONNABORTED') return 'La API tardó demasiado. Comprueba los datos antes de volver a intentar.';
  return 'No fue posible contactar la API. Revisa la conexión, la dirección del servidor y CORS.';
}
