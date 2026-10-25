import React from 'react';
import CampoTexto from '../atoms/CampoTexto';
import Selector from '../atoms/Selector';
import Error from '../atoms/Error';

export default function CampoFormulario(props) {
  return (
    <div className="formulario-grupo-input mb-3 text-start">
      {props.etiqueta && (
        <label htmlFor={props.id} className="form-label text-dark fw-bold small mb-1">
          {props.etiqueta}
        </label>
      )}

      <div className="position-relative">
        {props.icono && <span className="formulario-icono">{props.icono}</span>}
        
        {props.tipo === "select" ? (
          <Selector
            id={props.id}
            valor={props.valor}
            alCambiar={props.alCambiar}
            opciones={props.opciones}
          />
        ) : (
          <CampoTexto
            id={props.id}
            valor={props.valor}
            alCambiar={props.alCambiar}
            tipo={props.tipo}
            placeholder={props.placeholder}
          />
        )}
      </div>

      {props.error && (
        <div className="mt-1">
          <Error mensaje={props.error} />
        </div>
      )}
    </div>
  );
}