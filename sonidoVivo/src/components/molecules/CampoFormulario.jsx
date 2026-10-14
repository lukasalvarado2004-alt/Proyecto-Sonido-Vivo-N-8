import React from 'react';
import CampoTexto from '../atoms/CampoTexto';

export default function CampoFormulario(props) {
  return (
    <div className="formulario-grupo-input mb-3">
      {props.icono && <span className="formulario-icono">{props.icono}</span>}
      
      <CampoTexto
        valor={props.valor}
        alCambiar={props.alCambiar}
        tipo={props.tipo}
        placeholder={props.placeholder}
      />

      {props.error && (
        <small className="text-danger d-block text-start mt-1 ms-1 fw-bold">
          {props.error}
        </small>
      )}
    </div>
  );
}
