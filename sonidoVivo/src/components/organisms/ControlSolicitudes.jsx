import React from 'react';
import Selector from '../atoms/Selector';

export default function ControlSolicitudes(props) {
  const solicitudes = props.solicitudes || [];
  const onCambiarEstado = props.onCambiarEstado;

  // Estados coordinados con las vistas de despacho y seguimiento
  const opcionesEstado = [
    'Pendiente',
    'Preparando Pedido',
    'En Camino',
    'Entregado',
    'Cancelado'
  ];

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
              {solicitudes.map((sol) => {
                const claveUnica = sol.id || sol.codigo;

                return (
                  <tr key={claveUnica}>
                    <td className="fw-bold text-warning">{sol.codigo}</td>
                    <td>{sol.cliente}</td>
                    <td>{sol.destino}</td>
                    <td>
                      ${typeof sol.total === 'number' ? sol.total.toLocaleString('es-CL') : '0'}
                    </td>
                    <td>
                      {/* Corrección de prop: valorSeleccionado -> valor */}
                      <Selector
                        opciones={opcionesEstado}
                        valor={sol.estado}
                        alCambiar={(nuevoEstado) => {
                          if (typeof onCambiarEstado === 'function') {
                            onCambiarEstado(sol.id, nuevoEstado);
                          }
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}