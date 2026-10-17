import React from 'react';
import CampoTexto from '../atoms/CampoTexto';
import Selector from '../atoms/Selector';
import Error from '../atoms/Error'; // 1. IMPORTAMOS TU ÁTOMO DE ERROR REAL

export default function CampoFormulario(props) {
  return (
    <div className="formulario-grupo-input mb-3">
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
          valor={props.valor}
          alCambiar={props.alCambiar}
          tipo={props.tipo}
          placeholder={props.placeholder}
        />
      )}

      {/* 2. REEMPLAZAMOS EL SMALL POR TU ÁTOMO DE ACCESO DIRECTO */}
      {props.error && (
        <Error mensaje={props.error} /> 
      )}
    </div>
  );
}
