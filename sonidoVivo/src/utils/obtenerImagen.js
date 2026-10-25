// src/utils/obtenerImagen.js
const imagenes = import.meta.glob('../assets/*', { eager: true, import: 'default' });

export function obtenerImagenUrl(nombreImagen) {
  if (!nombreImagen) return '';

  if (
    nombreImagen.startsWith('http') || 
    nombreImagen.startsWith('/src/') || 
    nombreImagen.startsWith('/@fs/') ||
    nombreImagen.startsWith('data:')
  ) {
    return nombreImagen;
  }

 
  const clave = `../assets/${nombreImagen}`;
  if (imagenes[clave]) {
    return imagenes[clave];
  }

  const claveMinuscula = clave.toLowerCase();
  const coincidencia = Object.keys(imagenes).find(
    (k) => k.toLowerCase() === claveMinuscula
  );

  if (coincidencia) {
    return imagenes[coincidencia];
  }

  return nombreImagen;
}