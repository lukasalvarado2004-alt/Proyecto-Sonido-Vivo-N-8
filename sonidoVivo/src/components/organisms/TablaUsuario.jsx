import React from 'react';
import Tabla from '../atoms/Tabla';
import Boton from '../atoms/Boton';

export default function TablaUsuarios(props) {
  const { usuarios = [], onActivarEdicion, onEliminar } = props;

  const columnas = [
    { id: 'col-id', titulo: 'ID' },
    { id: 'col-nombre', titulo: 'Nombre' },
    { id: 'col-correo', titulo: 'Correo Electrónico' },
    { id: 'col-rol', titulo: 'Rol' },
    { id: 'col-acciones', titulo: 'Acciones', alineacion: 'center' }
  ];

  return (
    <div className="card p-3 shadow-sm border-0 bg-white">
      <h5 className="fw-bold border-bottom pb-2 mb-3">Usuarios Registrados</h5>

      <Tabla columnas={columnas}>
        {usuarios.map((u, idx) => {
          const claveUnica = u.id || u.correo;
          const rolLimpio = (u.rol || 'cliente').toLowerCase();
          const esAdmin = rolLimpio === 'admin' || rolLimpio === 'administrador';
          const esVentas = rolLimpio === 'ventas' || rolLimpio === 'vendedor';

          const badgeColor = esAdmin
            ? 'bg-danger'
            : esVentas
            ? 'bg-warning text-dark'
            : 'bg-primary';

          return (
            <tr key={claveUnica}>
              <td className="fw-bold small">{u.id || idx + 1}</td>
              <td className="fw-semibold">{u.nombre}</td>
              <td className="text-muted">{u.correo}</td>
              <td>
                <span className={`badge ${badgeColor}`}>
                  {u.rol || 'cliente'}
                </span>
              </td>
              <td className="text-center">
                <div className="d-flex justify-content-center gap-2">
                  <Boton
                    tipo="button"
                    variante="purple"
                    textoBoton="Editar"
                    alHacerClic={() => onActivarEdicion(u)}
                  />
                  {onEliminar && (
                    <Boton
                      tipo="button"
                      variante="danger"
                      textoBoton="Eliminar"
                      alHacerClic={() => onEliminar(u.id)}
                    />
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </Tabla>
    </div>
  );
}