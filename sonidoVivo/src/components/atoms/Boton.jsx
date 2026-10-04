// src/components/atoms/Boton.jsx
import React from 'react';

export default function Boton({ 
  alHacerClic, 
  textoBoton, 
  variante = "primary", 
  tipo = "button",
  esBloque = false // Si es true, ocupa todo el ancho
}) {
  return (
    <button 
      type={tipo} 
      className={`btn btn-${variante} fw-bold px-3 py-2 ${esBloque ? 'w-100' : ''}`} 
      onClick={alHacerClic}
    >
      {textoBoton}
    </button>
  );
}