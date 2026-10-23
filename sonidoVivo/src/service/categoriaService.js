import productosIniciales from '../data/Productos.json';

const CLAVE = 'categorias';

const categoriasPorDefecto = Array.from(
  new Set(productosIniciales.map((p) => p.categoria).filter(Boolean))
);

function leer() {
  const guardado = localStorage.getItem(CLAVE);
  if (!guardado) {
    localStorage.setItem(CLAVE, JSON.stringify(categoriasPorDefecto));
    return [...categoriasPorDefecto];
  }
  try {
    return JSON.parse(guardado);
  } catch (e) {
    return [...categoriasPorDefecto];
  }
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

export function listarCategorias() {
  return leer();
}

export function crearCategoria(nombre) {
  const lista = leer();
  const nombreTrim = nombre.trim();
  if (!lista.some((c) => c.toLowerCase() === nombreTrim.toLowerCase())) {
    const nuevaLista = [...lista, nombreTrim];
    guardar(nuevaLista);
    return nuevaLista;
  }
  return lista;
}

export function actualizarCategoria(nombreAntiguo, nombreNuevo) {
  const lista = leer();
  const nuevoTrim = nombreNuevo.trim();
  const nuevaLista = lista.map((c) => (c === nombreAntiguo ? nuevoTrim : c));
  guardar(nuevaLista);
  return nuevaLista;
}

export function eliminarCategoria(nombre) {
  const lista = leer();
  const nuevaLista = lista.filter((c) => c !== nombre);
  guardar(nuevaLista);
  return nuevaLista;
}