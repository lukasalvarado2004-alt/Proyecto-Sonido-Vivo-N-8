import React from 'react';
import Textarea from '../atoms/Textarea';
import Error from '../atoms/Error';

export default function CampoMensaje(props) {
  
  const claseColor = props.colorEtiqueta || 'text-light';

  return (
    <div className="formulario-grupo-input mb-3 text-start">
      {props.etiqueta && (
        <label htmlFor={props.id} className={`form-label fw-bold small mb-1 ${claseColor}`}>
          {props.etiqueta}
        </label>
      )}
      
      <Textarea
        id={props.id}
        valor={props.valor}
        alCambiar={props.alCambiar}
        placeholder={props.placeholder}
        filas={props.filas || 5}
        tieneError={!!props.error}
      />
      
      {props.error && (
        <div className="mt-1">
          <Error mensaje={props.error} variante="danger" />
        </div>
      )}
    </div>
  );
}