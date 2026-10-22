import React from 'react';

export default function Selector(props) {
  const opciones = props.opciones || [];

  return (
    <select
      id={props.id}
      value={props.valor}
      onChange={(e) => props.alCambiar(e.target.value)}
      className="form-select formulario-input-native"
    >
      <option value="">-- Selecciona una categoría --</option>
      {opciones.map((opcion, idx) => (
        <option key={idx} value={opcion}>
          {opcion}
        </option>
      ))}
    </select>
  );
}
