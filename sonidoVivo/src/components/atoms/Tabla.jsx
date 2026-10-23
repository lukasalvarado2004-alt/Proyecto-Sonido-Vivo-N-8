import React from 'react';

export default function Tabla(props) {
  const { columnas = [], children, claseExtra = '' } = props;

  return (
    <div className="table-responsive">
      <table className={`table table-hover align-middle ${claseExtra}`}>
        <thead className="table-dark">
          <tr>
            {columnas.map((col) => (
              <th 
                key={col.id || col.titulo} 
                className={col.alineacion ? `text-${col.alineacion}` : ''}
              >
                {col.titulo}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
}