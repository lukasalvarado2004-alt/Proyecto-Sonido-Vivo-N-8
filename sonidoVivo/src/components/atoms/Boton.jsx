import React from 'react';

export default function Boton(props) {

  const variante = props.variante || 'primary';
  const tipo = props.tipo || 'button';
  const esBloque = props.esBloque || false;

  return (
    <button 
      type={tipo} 
      className={`btn btn-${variante} fw-bold px-3 py-2 ${esBloque ? 'w-100' : ''}`} 
      onClick={props.alHacerClic}
      disabled={props.disabled} 
    >
      {props.textoBoton}
    </button>
  );
}