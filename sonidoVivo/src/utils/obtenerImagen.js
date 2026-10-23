// src/utils/obtenerImagen.js
const imagenes = import.meta.glob('../assets/*', { eager: true, import: 'default' });

export function obtenerImagenUrl(nombreImagen) {
  if (!nombreImagen) return '';

  // 1. Si ya es una URL web o una ruta resuelta por Vite, la devuelve directa
  if (
    nombreImagen.startsWith('http') || 
    nombreImagen.startsWith('/src/') || 
    nombreImagen.startsWith('/@fs/') ||
    nombreImagen.startsWith('data:')
  ) {
    return nombreImagen;
  }

  // 2. Coincidencia exacta en src/assets/
  const clave = `../assets/${nombreImagen}`;
  if (imagenes[clave]) {
    return imagenes[clave];
  }

  // 3. Coincidencia insensible a mayúsculas/minúsculas
  const claveMinuscula = clave.toLowerCase();
  const coincidencia = Object.keys(imagenes).find(
    (k) => k.toLowerCase() === claveMinuscula
  );

  if (coincidencia) {
    return imagenes[coincidencia];
  }

  return nombreImagen;
}