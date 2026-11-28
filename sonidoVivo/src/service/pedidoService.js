import { pedidosApi } from '../services/api';

export async function crearPedido(direccionEnvio, items) {
  const detalles = items.map(({ producto, cantidad }) => ({ idProducto: producto.id, cantidad }));
  const { data } = await pedidosApi.post('/pedidos', { direccionEnvio, detalles });
  return data;
}
export async function listarMisPedidos(signal) {
  const { data } = await pedidosApi.get('/pedidos', { signal });
  return data;
}
export function resumenPedido(pedido, productos, cliente = {}) {
  return {
    nroSolicitud: pedido.codigoSeguimiento, total: pedido.total,
    direccion: pedido.direccionEnvio, nombre: cliente.nombre || `Usuario ${pedido.idUsuario}`,
    correo: cliente.correo, items: pedido.detalles.map(d => ({
      cantidad: d.cantidad, producto: { id: d.idProducto, precio: d.precioUnitario,
        nombre: productos.find(p => p.id === d.idProducto)?.nombre || `Producto ${d.idProducto}` }
    }))
  };
}
