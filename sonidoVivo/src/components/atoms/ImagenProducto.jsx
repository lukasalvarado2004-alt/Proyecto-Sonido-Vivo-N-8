import React from 'react';
import { obtenerImagenUrl } from '../../utils/obtenerImagen';

function ImagenProducto(props) {
  const className = props.className || "imagen-producto";

  return (
    <img 
      src={obtenerImagenUrl(props.urlImagen)} 
      alt={props.altTexto || "Imagen de producto"} 
      className={className}
    />
  );
}

export default ImagenProducto;