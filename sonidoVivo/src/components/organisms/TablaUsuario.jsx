// src/components/organisms/TablaUsuarios.jsx
import React from 'react';
import Tabla from '../atoms/Tabla';
import Boton from '../atoms/Boton';

export default function TablaUsuarios(props) {
  const { usuarios = [], onActivarEdicion } = props;

  const columnas = [
    { titulo: 'ID' },
    { titulo: 'Nombre' },
    { titulo: 'Correo Electrónico' },
    { titulo: 'Rol' },
    { titulo: 'Acciones', alineacion: 'center' }
  ];

  return (
    <div className="card p-3 shadow-sm border-0 bg-white">
      <h5 className="fw-bold border-bottom pb-2 mb-3">Usuarios Registrados</h5>

      <Tabla columnas={columnas}>
        {usuarios.map((u, idx) => (
          <tr key={u.id ? `u-${u.id}` : `idx-${idx}`}>
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
        ))}
      </Tabla>
    </div>
  );
}