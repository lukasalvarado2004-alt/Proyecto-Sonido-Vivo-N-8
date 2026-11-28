import React, { useState } from 'react';
import { obtenerImagenUrl, imagenLocal } from '../../utils/obtenerImagen';

function Foto({ urlImagen, altTexto = 'Imagen de producto', className = 'imagen-producto' }) {
  const urlIndicada = obtenerImagenUrl(urlImagen);
  const local = imagenLocal(urlImagen, altTexto);
  const [fallidas, setFallidas] = useState([]);
  const url = [local.url, urlIndicada].find(src => src && !fallidas.includes(src));
  if (!url) return <span className={className}>Imagen no disponible</span>;

  const referencia = url === local.url && local.referencia;
  return <>
    <img src={url} alt={referencia ? 'Imagen referencial de guitarra eléctrica' : altTexto}
      className={className} onError={() => setFallidas(prev => [...prev, url])} />
    {referencia && <small className="text-secondary">Imagen referencial</small>}
  </>;
}

export default function ImagenProducto(props) {
  return <Foto key={JSON.stringify([props.urlImagen, props.altTexto])} {...props} />;
}
