// src/service/productoService.js
import productosIniciales from '../data/Productos.json';

const CLAVE = 'productos';

function leer() {
  const guardado = localStorage.getItem(CLAVE);
  if (!guardado) {
    const iniciales = Array.isArray(productosIniciales) ? productosIniciales : [];
    localStorage.setItem(CLAVE, JSON.stringify(iniciales));
    return [...iniciales];
  }
  try {
    const parseado = JSON.parse(guardado);
    return Array.isArray(parseado) && parseado.length > 0 ? parseado : productosIniciales;
  } catch (e) {
    return productosIniciales;
  }
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

export function listarProductos() {
  return leer();
}

export function actualizarProducto(identificador, cambios) {
  if (identificador === undefined || identificador === null) return null;

  const lista = leer();
  const idBuscado = String(identificador).trim().toLowerCase();
  let encontrado = false;

  const listaActualizada = lista.map((p, idx) => {
    const codigoProd = String(p.codigo || '').trim().toLowerCase();
    const idProd = String(p.id || '').trim().toLowerCase();
    const indexStr = String(idx);

    if (codigoProd === idBuscado || idProd === idBuscado || indexStr === idBuscado) {
      encontrado = true;
      return {
        ...p,
        ...cambios,
        ...(cambios.stock !== undefined ? { stock: Number(cambios.stock) } : {}),
        ...(cambios.precio !== undefined ? { precio: Number(cambios.precio) } : {})
      };
    }
    return p;
  });

  if (encontrado) {
    guardar(listaActualizada);
  }

  return listaActualizada;
}

export function crearProducto(datos) {
  const lista = leer();
  const nuevoProducto = {
    ...datos,
    id: datos.id || datos.codigo || `PROD-${Date.now()}`,
    codigo: datos.codigo || `GA${String(lista.length + 1).padStart(3, '0')}`,
    stock: Number(datos.stock) || 0,
    precio: Number(datos.precio) || 0
  };
  const listaActualizada = [...lista, nuevoProducto];
  guardar(listaActualizada);
  return nuevoProducto;
}

export function eliminarProducto(identificador) {
  const lista = leer();
  const idBuscado = String(identificador).trim().toLowerCase();

  const listaFiltrada = lista.filter((p, idx) => {
    const codigoProd = String(p.codigo || '').trim().toLowerCase();
    const idProd = String(p.id || '').trim().toLowerCase();
    const indexStr = String(idx);
    return codigoProd !== idBuscado && idProd !== idBuscado && indexStr !== idBuscado;
  });

  guardar(listaFiltrada);
  return true;
}