// src/service/productoService.js
import productosIniciales from '../data/Productos.json';

const CLAVE = 'productos';
const CLAVE_VERSION = 'productos_version';
const VERSION_ACTUAL = 'v3_pedales_fix'; // Cambiamos versión para forzar recarga

function leer() {
  const versionGuardada = localStorage.getItem(CLAVE_VERSION);
  const guardado = localStorage.getItem(CLAVE);

  if (!guardado || versionGuardada !== VERSION_ACTUAL) {
    localStorage.setItem(CLAVE, JSON.stringify(productosIniciales));
    localStorage.setItem(CLAVE_VERSION, VERSION_ACTUAL);
    return [...productosIniciales];
  }

  return JSON.parse(guardado);
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

export function listarProductos() {
  return leer();
}

export function crearProducto(datos) {
  const lista = leer();
  const nuevo = { ...datos, id: datos.id || datos.codigo };
  guardar([...lista, nuevo]);
  return nuevo;
}

export function actualizarProducto(id, cambios) {
  const lista = leer().map((p) => 
    (p.id === id || p.codigo === id) ? { ...p, ...cambios } : p
  );
  guardar(lista);
  return lista.find((p) => p.id === id || p.codigo === id) ?? null;
}

export function eliminarProducto(id) {
  const listaActual = leer();
  const listaFiltrada = listaActual.filter((p) => p.id !== id && p.codigo !== id);
  guardar(listaFiltrada);
}