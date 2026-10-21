// src/utils/filtrarProductos.js

// Exportación que requiere Catalogo.jsx
export function filtrarPorCategoria(productos, categoria) {
  if (!categoria || categoria === "todas" ) {
    return productos;
  }

  return productos.filter(
    (p) => p.categoria && p.categoria.toLowerCase() === categoria.toLowerCase()
  );
}

// Exportación que requiere Inicio.jsx
export function filtrarProductos(productos, filtros = {}) {
  const buscado = (filtros.texto || '').trim().toLowerCase();
  const categoria = (filtros.categoria || '').trim().toLowerCase();

  return productos.filter((p) => {
    const coincideTexto =
      buscado === '' ||
      (p.nombre && p.nombre.toLowerCase().includes(buscado));

    const coincideCategoria =
      categoria === '' ||
      categoria === 'todas' ||
      (p.categoria && p.categoria.toLowerCase() === categoria);

    return coincideTexto && coincideCategoria;
  });
}