import { productosApi } from '../services/api';

function desdeAPI(p) {
  return { ...p, codigo: p.id, categoria: p.nombreCategoria, imagen: p.imagenUrl || '' };
}
function entrada({ idCategoria, nombre, descripcion, precio, stock, imagen }) {
  return { idCategoria: Number(idCategoria), nombre, descripcion, precio, stock, imagenUrl: imagen || null };
}
export async function listarProductos(signal) {
  const { data } = await productosApi.get('/productos', { signal });
  return data.map(desdeAPI);
}
export async function crearProducto(datos) {
  const { data } = await productosApi.post('/productos', entrada(datos));
  return desdeAPI(data);
}
export async function actualizarProducto(id, datos) {
  const { data } = await productosApi.put(`/productos/${id}`, entrada(datos));
  return desdeAPI(data);
}
export async function eliminarProducto(id) {
  await productosApi.delete(`/productos/${id}`);
}
