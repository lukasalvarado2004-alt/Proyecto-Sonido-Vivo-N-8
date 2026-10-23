import React from 'react';
import Tabla from '../atoms/Tabla';
import Boton from '../atoms/Boton';

export default function TablaProductos(props) {
  const { productos = [], umbralStock = 5, onActivarEdicion, onEliminar } = props;

  const columnas = [
    { id: 'col-codigo', titulo: 'Código' },
    { id: 'col-nombre', titulo: 'Nombre' },
    { id: 'col-stock', titulo: 'Stock' },
    { id: 'col-precio', titulo: 'Precio' },
    { id: 'col-acciones', titulo: 'Acciones', alineacion: 'center' }
  ];

  return (
    <div className="card p-3 shadow-sm border-0 bg-white">
      <h5 className="fw-bold border-bottom pb-2 mb-3">Inventario Registrado</h5>

      <div className="tabla-scroll-admin table-responsive">
        <Tabla columnas={columnas}>
          {productos.map((p) => {
            const stock = Number(p.stock ?? 0);
            const esCritico = stock <= Number(umbralStock);
            const claveUnica = p.id || p.codigo;

            return (
              <tr key={claveUnica}>
                <td className="fw-bold small">{p.codigo}</td>
                <td className="fw-semibold">{p.nombre}</td>
                <td>
                  <span className={`badge ${esCritico ? 'bg-warning text-dark' : 'bg-success'}`}>
                    {stock} un.
                  </span>
                </td>
                <td className="fw-bold text-success">
                  ${Number(p.precio || 0).toLocaleString('es-CL')}
                </td>
                <td className="text-center">
                  <div className="d-flex justify-content-center gap-2">
                    <Boton
                      tipo="button"
                      variante="purple"
                      textoBoton="Editar"
                      alHacerClic={() => onActivarEdicion(p)}
                    />
                    <Boton
                      tipo="button"
                      variante="danger"
                      textoBoton="Eliminar"
                      alHacerClic={() => onEliminar(p.id ?? p.codigo)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </Tabla>
      </div>
    </div>
  );
}