import React from 'react';

export default function Boton(props) {
  // Asignación de valores por defecto usando operador OR (||)
  const variante = props.variante || 'primary';
  const tipo = props.tipo || 'button';
  const esBloque = props.esBloque || false;

  return (
    <button 
      type={tipo} 
      className={`btn btn-${variante} fw-bold px-3 py-2 ${esBloque ? 'w-100' : ''}`} 
      onClick={props.alHacerClic}
    >
      {props.textoBoton}
    </button>
  );
}