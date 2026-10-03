import React from "react";

function ImagenProducto({ urlImagen, altTexto }) {
  return (
    <img 
      src={urlImagen} 
      alt={altTexto} 
      className="card-img-top imagen-producto"
    />
  );
}

export default ImagenProducto;