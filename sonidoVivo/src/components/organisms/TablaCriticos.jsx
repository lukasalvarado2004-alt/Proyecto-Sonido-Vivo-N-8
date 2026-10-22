// src/components/organisms/TablaCriticos.jsx
import React from 'react';
import Tabla from '../atoms/Tabla';

export default function TablaCriticos(props) {
  const productos = props.productos || [];
  const umbralStock = props.umbralStock;
  const setUmbralStock = props.setUmbralStock;

  // Filtrar productos con stock <= umbral y ordenarlos de mayor a menor stock
  const productosCriticos = productos
    .filter((p) => Number(p.stock) <= Number(umbralStock || 0))
    .sort((a, b) => Number(b.stock) - Number(a.stock));

  const columnas = [
    { titulo: 'Código' },
    { titulo: 'Nombre' },
    { titulo: 'Categoría' },
    { titulo: 'Stock' },
    { titulo: 'Precio' }
  ];

  return (
    <div className="card p-4 shadow-sm border-0 bg-white">
      <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3 flex-wrap gap-2">
        <div>
          <h5 className="fw-bold mb-0">Ítems Críticos</h5>
          <small className="text-muted">Los ítems con poco stock</small>
        </div>
        
        {/* FILTRO POR NÚMERO DE STOCK */}
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="umbral-stock" className="fw-semibold small text-nowrap">
            Filtrar stock &le;:
          </label>
          <input
            id="umbral-stock"
            type="number"
            min="0"
            className="form-control form-control-sm text-center fw-bold"
            value={umbralStock}
            onChange={(e) => setUmbralStock(e.target.value)}
          />
        </div>
      </div>

      <div className="tabla-scroll-admin table-responsive">
        <Tabla columnas={columnas}>
          {productosCriticos.length > 0 ? (
            productosCriticos.map((p, idx) => (
              <tr key={p.id ?? p.codigo ?? idx}>
                <td className="fw-bold small">{p.codigo}</td>
                <td className="fw-semibold">{p.nombre}</td>
                <td className="text-muted">{p.categoria}</td>
                <td>
                  <span className="badge bg-danger">
                    {p.stock} un.
                  </span>
                </td>
                <td className="fw-bold text-success">
                  ${Number(p.precio || 0).toLocaleString('es-CL')}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-muted">
                No hay productos con stock menor o igual a {umbralStock}.
              </td>
            </tr>
          )}
        </Tabla>
      </div>
    </div>
  );
}