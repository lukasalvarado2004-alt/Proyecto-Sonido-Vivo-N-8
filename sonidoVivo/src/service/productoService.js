// src/service/productoService.js
import productosIniciales from '../data/Productos.json'

const CLAVE = 'productos'

function leer() {
  const guardado = localStorage.getItem(CLAVE)
  if (guardado === null) {
    localStorage.setItem(CLAVE, JSON.stringify(productosIniciales))
    return [...productosIniciales]
  }
  return JSON.parse(guardado)
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

export function listarProductos() {
  return leer()
}

export function obtenerProducto(id) {
  return leer().find((p) => Number(p.id) === Number(id)) ?? null
}

export function crearProducto(datos) {
  const lista = leer()
  const nuevoId = Math.max(0, ...lista.map((p) => Number(p.id || 0))) + 1
  const nuevo = { ...datos, id: nuevoId }
  guardar([...lista, nuevo])
  return nuevo
}

export function actualizarProducto(identificador, cambios) {
  const lista = leer().map((p) => {
    // Compara por id o por codigo
    const coincide = p.id ? Number(p.id) === Number(identificador) : p.codigo === identificador
    return coincide ? { ...p, ...cambios } : p
  })
  
  guardar(lista)
  return lista.find((p) => (p.id ? Number(p.id) === Number(identificador) : p.codigo === identificador)) ?? null
}

export function eliminarProducto(id) {
  const listaActual = leer()
  const listaFiltrada = listaActual.filter((p) => Number(p.id) !== Number(id))
  guardar(listaFiltrada)
}
