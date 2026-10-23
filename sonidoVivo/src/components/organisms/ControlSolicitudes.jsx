// src/components/organisms/ControlSolicitudes.jsx
import React from 'react';
import Selector from '../atoms/Selector';

export default function ControlSolicitudes({ solicitudes = [], onCambiarEstado }) {
  const opcionesEstado = ['Pendiente', 'Enviado', 'Entregado', 'Cancelado'];

  return (
    <div className="card bg-dark text-light border-secondary p-4">
      <h3 className="h4 text-warning mb-4">📑 Control de Solicitudes de Despacho</h3>

      {solicitudes.length === 0 ? (
        <p className="text-secondary">No hay solicitudes pendientes.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-hover border-secondary align-middle">
            <thead>
              <tr className="text-secondary">
                <th scope="col">Código</th>
                <th scope="col">Cliente</th>
                <th scope="col">Destino</th>
                <th scope="col">Total</th>
                <th scope="col" className="col-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((sol) => (
                <tr key={sol.id}>
                  <td className="fw-bold text-warning">{sol.codigo}</td>
                  <td>{sol.cliente}</td>
                  <td>{sol.destino}</td>
                  <td>${sol.total?.toLocaleString('es-CL')}</td>
                  <td>
                    <Selector
                      opciones={opcionesEstado}
                      valorSeleccionado={sol.estado}
                      alCambiar={(nuevoEstado) => onCambiarEstado(sol.id, nuevoEstado)}
                      placeholder="-- Estado de envío --"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}