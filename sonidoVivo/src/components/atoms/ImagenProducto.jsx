import React from 'react';
import { obtenerImagenUrl } from '../../utils/obtenerImagen';

function ImagenProducto({ 
  urlImagen, 
  altTexto, 
  className = "imagen-producto" 
}) {
  return (
    <img 
      src={obtenerImagenUrl(urlImagen)} 
      alt={altTexto || "Imagen de producto"} 
      className={className}
    />
  );
}

export default ImagenProducto;