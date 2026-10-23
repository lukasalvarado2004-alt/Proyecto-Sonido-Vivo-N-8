// src/pages/DetalleProducto.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import InfoProductoDetalle from '../components/organisms/InfoProductoDetalle';
import PlantillaPublica from '../components/templates/PlantillaPublica';
// 1. Importamos el contexto global de productos
import { useProductos } from '../context/ProductosContext';

export default function DetalleProducto() {
  const params = useParams();
  const navigate = useNavigate();

  // 2. Extraemos el listado dinámico (incluye productos creados en el Admin)
  const { productos } = useProductos();

  // 3. Buscamos el producto en la lista dinámica de LocalStorage/Context
  const productoEncontrado = productos.find(
    (item) => item.codigo === params.id || String(item.id) === params.id
  );

  return (
    <PlantillaPublica>
      <Container className="py-4">
        <InfoProductoDetalle producto={productoEncontrado} />
      </Container>
    </PlantillaPublica>
  );
}