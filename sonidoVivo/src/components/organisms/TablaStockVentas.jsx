// src/components/organisms/TablaStockVentas.jsx
import React, { useState } from 'react';

export default function TablaStockVentas(props) {
  const productos = props.productos || [];
  const onActualizarStock = props.onActualizarStock;

  const [stocksLocales, setStocksLocales] = useState({});

  const manejarCambioInput = (key, valor) => {
    setStocksLocales((prev) => ({
      ...prev,
      [key]: valor
    }));
  };

  const manejarGuardar = (prod, key) => {
    const valorInput = stocksLocales[key];
    const nuevoStock = valorInput !== undefined ? parseInt(valorInput, 10) : parseInt(prod.stock, 10);

    if (!isNaN(nuevoStock) && nuevoStock >= 0) {
      const idParaGuardar = prod.codigo || prod.id || key;
      if (typeof onActualizarStock === 'function') {
        onActualizarStock(idParaGuardar, nuevoStock);
      }

      setStocksLocales((prev) => {
        const copia = { ...prev };
        delete copia[key];
        return copia;
      });
    }
  };

  return (
    <div className="card bg-white text-dark border-0 shadow-sm p-4 rounded-3">
      <h3 className="h4 text-dark fw-bold mb-4 d-flex align-items-center gap-2">
        <span>📦</span> Control e Inventario de Stock
      </h3>

      {productos.length === 0 ? (
        <p className="text-muted">No hay productos registrados en el inventario.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle border-top">
            <thead className="table-dark">
              <tr>
                <th scope="col">Código</th>
                <th scope="col">Nombre</th>
                <th scope="col">Categoría</th>
                <th scope="col">Precio</th>
                <th scope="col">Stock Actual</th>
                <th scope="col" className="col-3">Actualizar Stock</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod, idx) => {
                const key = prod.codigo || prod.id || `idx-${idx}`;
                const valorInput = stocksLocales[key] !== undefined ? stocksLocales[key] : prod.stock;

                return (
                  <tr key={key}>
                    <td className="fw-bold text-dark">{prod.codigo || prod.id || `GA00${idx + 1}`}</td>
                    <td className="fw-semibold">{prod.nombre}</td>
                    <td className="text-secondary small">{prod.categoria || 'Guitarras'}</td>
                    <td className="text-success fw-bold">
                      ${Number(prod.precio || 0).toLocaleString('es-CL')}
                    </td>
                    <td>
                      <span className={`badge ${Number(prod.stock) > 5 ? 'bg-success' : 'bg-danger'}`}>
                        {prod.stock} un.
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <input
                          type="number"
                          min="0"
                          className="form-control form-control-sm bg-light text-dark border-secondary"
                          value={valorInput}
                          onChange={(e) => manejarCambioInput(key, e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-primary btn-sm fw-bold px-3"
                          onClick={() => manejarGuardar(prod, key)}
                        >
                          Guardar
                        </button>
                      </div>
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