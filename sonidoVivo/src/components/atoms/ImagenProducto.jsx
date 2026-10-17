import React from "react";

function ImagenProducto(props) {
  return (
    <img 
      src={props.urlImagen} 
      alt={props.altTexto} 
      className="card-img-top imagen-producto"
    />
  );
}

export default ImagenProducto;
