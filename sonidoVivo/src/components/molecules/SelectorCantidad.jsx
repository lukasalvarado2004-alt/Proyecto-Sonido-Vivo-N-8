import React from 'react';
import Boton from '../atoms/Boton';

export default function SelectorCantidad(props) {
  return (
    <div className="d-flex align-items-center gap-2">
      <Boton 
        textoBoton="-" 
        variante="outline-secondary" 
        alHacerClic={props.onDecrementar} 
        disabled={props.cantidad <= 1}
      />
      
      <span className="fw-bold px-3 fs-5">{props.cantidad}</span>
      
      <Boton 
        textoBoton="+" 
        variante="outline-secondary" 
        alHacerClic={props.onIncrementar} 
        disabled={props.cantidad >= props.maxStock}
      />
    </div>
  );
}