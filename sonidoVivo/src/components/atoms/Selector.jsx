import React from 'react';

export default function Selector(props) {
  const opciones = props.opciones || [];

  return (
    <select
      id={props.id}
      value={props.valor}
      onChange={(e) => props.alCambiar(e.target.value)}
      className="form-select formulario-input-nativo"
    >
      <option value="">-- Selecciona una opción --</option>
      {opciones.map((opcion) => (
        <option key={opcion} value={opcion}>
          {opcion}
        </option>
      ))}
    </select>
  );
}