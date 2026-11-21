import React from 'react';
import Tabla from '../atoms/Tabla';
import Boton from '../atoms/Boton';

export default function TablaCategoria(props) {
  const { categorias = [], onActivarEdicion, onEliminar } = props;

  const columnas = [
    { titulo: 'N°' },
    { titulo: 'Nombre de la Categoría' },
    { titulo: 'Acciones', alineacion: 'center' }
  ];

  return (
    <div className="card p-3 shadow-sm border-0 bg-white">
      <h5 className="fw-bold border-bottom pb-2 mb-3">Categorías Registradas</h5>

      <div className="tabla-scroll-admin table-responsive">
        <Tabla columnas={columnas}>
          {categorias.length > 0 ? (
            categorias.map((cat, idx) => (
              <tr key={cat}>
                <td className="fw-bold small">{idx + 1}</td>
                <td className="fw-semibold">{cat}</td>
                <td className="text-center">
                  <div className="d-flex justify-content-center gap-2">
                    <Boton
                      tipo="button"
                      variante="purple"
                      textoBoton="Editar"
                      alHacerClic={() => onActivarEdicion(cat)}
                    />
                    <Boton
                      tipo="button"
                      variante="danger"
                      textoBoton="Eliminar"
                      alHacerClic={() => onEliminar(cat)}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4 text-muted">
                No hay categorías registradas.
              </td>
            </tr>
          )}
        </Tabla>
      </div>
    </div>
  );
}