import React from "react";

export function ResumenPedido(props) {
  const compra = props.compra;

  if (!compra) return null;

  return (
    <div className="text-start bg-black bg-opacity-20 p-3 rounded mb-3 border border-secondary border-opacity-25 text-white">
      <h5 className="text-warning mb-2 fw-bold">🧾 Solicitud: {compra.nroSolicitud}</h5>
      
      <p className="mb-1 small"><strong>Cliente:</strong> {compra.nombre}</p>
      
      {compra.correo && (
        <p className="mb-1 small"><strong>Correo:</strong> {compra.correo}</p>
      )}
      
      <p className="mb-2 small"><strong>Destino:</strong> {compra.direccion}, {compra.comuna}</p>
      
      <div className="border-top border-secondary border-opacity-25 pt-2 mt-2">
        <strong className="small text-white-50">Productos:</strong>
        <div className="d-flex flex-column gap-1 ps-2 mt-1">
          {compra.items && compra.items.map((item, idx) => {
            const claveProducto = item.producto.id || item.producto.codigo || idx;
            return (
              <div key={claveProducto} className="d-flex justify-content-between small text-white-50">
                <span>{item.producto.nombre} (x{item.cantidad})</span>
                <span>${(item.producto.precio * item.cantidad).toLocaleString('es-CL')}</span>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="d-flex justify-content-between align-items-center pt-2 mt-2 border-top border-secondary border-opacity-25">
        <strong>Total Pagado:</strong>
        <strong className="text-warning">${compra.total ? compra.total.toLocaleString('es-CL') : 0}</strong>
      </div>
    </div>
  );
}

export default ResumenPedido;