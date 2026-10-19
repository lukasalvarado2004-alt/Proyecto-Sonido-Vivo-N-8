
export function filtrarPorCategoria(productos, categoria) {
  if (!categoria || categoria === "todas" || categoria === "Todas") {
    return productos;
  }

  return productos.filter(
    (p) => p.categoria && p.categoria.toLowerCase() === categoria.toLowerCase()
  );
}