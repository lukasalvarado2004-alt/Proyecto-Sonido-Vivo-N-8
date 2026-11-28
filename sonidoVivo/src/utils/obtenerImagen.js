import catalogo from '../data/Productos.json';

const archivos = import.meta.glob('../assets/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });

function normalizar(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

const porNombre = new Map(Object.entries(archivos).map(([ruta, url]) => [
  normalizar(ruta.split('/').pop()), url
]));

function archivoLocal(ruta) {
  const nombre = ruta.split(/[?#]/)[0].split(/[\\/]/).pop();
  try {
    return porNombre.get(normalizar(decodeURIComponent(nombre)));
  } catch {
    return undefined;
  }
}

export function obtenerImagenUrl(valor) {
  const ruta = typeof valor === 'string' ? valor.trim() : '';
  if (!ruta) return undefined;
  if (/^(https?:\/\/|\/\/|data:image\/|blob:)/i.test(ruta)) return ruta;
  return archivoLocal(ruta) || (ruta.startsWith('/') ? ruta : import.meta.env.BASE_URL + ruta.replace(/^\.\//, ''));
}

const porProducto = new Map();
for (const { nombre, marca, modelo, imagen } of catalogo) {
  const url = archivoLocal(imagen);
  if (!url) continue;
  for (const clave of [nombre, modelo, marca + ' ' + modelo, nombre + ' ' + marca,
    nombre + ' ' + modelo, nombre + ' ' + marca + ' ' + modelo]) {
    porProducto.set(normalizar(clave), url);
  }
}

export function imagenLocal(ruta, nombre) {
  const clave = normalizar(nombre || '');
  const url = archivoLocal(typeof ruta === 'string' ? ruta : '') || porProducto.get(clave);
  if (url) return { url, referencia: false };
  if (clave === 'guitarraelectricayamaha') {
    return { url: archivoLocal('Guitarra Electrica Stratocaster.webp'), referencia: true };
  }
  return {};
}
