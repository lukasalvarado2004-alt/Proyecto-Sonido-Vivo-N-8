import React from 'react';
import Error from '../atoms/Error';
import { useContenidoCarrito } from '../../context/ContenidoCarrito';

export default function NotificacionStock() {
  const { mensajeErrorStock } = useContenidoCarrito();

  if (!mensajeErrorStock) return null;

  return (
    <div className="position-fixed top-0 start-50 translate-middle-x mt-4 z-3 shadow-lg px-3 notificacion-stock-contenedor">
      <Error mensaje={mensajeErrorStock} variante="warning" />
    </div>
  );
}