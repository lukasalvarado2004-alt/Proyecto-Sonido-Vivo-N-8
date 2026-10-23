import React from 'react';
import Tabla from '../atoms/Tabla';
import Boton from '../atoms/Boton';

export default function TablaUsuarios(props) {
  const { usuarios = [], onActivarEdicion } = props;

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

          return (
            <tr key={claveUnica}>
              <td className="fw-bold small">{u.id || idx + 1}</td>
              <td className="fw-semibold">{u.nombre}</td>
              <td className="text-muted">{u.correo}</td>
              <td>
                <span className={`badge ${u.rol === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                  {u.rol || 'cliente'}
                </span>
              </td>
              <td className="text-center">
                <Boton
                  tipo="button"
                  variante="purple"
                  textoBoton="Editar"
                  alHacerClic={() => onActivarEdicion(u)}
                />
              </td>
            </tr>
          );
        })}
      </Tabla>
    </div>
  );
}