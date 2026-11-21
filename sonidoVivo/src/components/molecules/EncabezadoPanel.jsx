import React from 'react';

export default function EncabezadoPanel(props) {
  return (
    <div className="bg-dark p-3 rounded shadow-sm mb-4 border border-secondary">
      <h2 className="h4 fw-bold mb-0 text-white">{props.titulo}</h2>
      {props.subtitulo && <small className="text-light">{props.subtitulo}</small>}
    </div>
  );
}