import React from 'react';

export default function Textarea(props) {
  return (
    <textarea
      id={props.id}
      className={`form-control bg-light text-dark border-secondary ${props.tieneError ? 'is-invalid' : ''}`}
      rows={props.filas || 5}
      value={props.valor}
      onChange={(e) => props.alCambiar(e.target.value)}
      placeholder={props.placeholder}
    />
  );
}