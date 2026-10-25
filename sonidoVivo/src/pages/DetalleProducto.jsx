import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import InfoProductoDetalle from '../components/organisms/InfoProductoDetalle';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import Boton from '../components/atoms/Boton';
import { useProductos } from '../context/ProductosContext';

export default function DetalleProducto() {
  const params = useParams();
  const navigate = useNavigate();
  const { productos } = useProductos();

  const productoEncontrado = productos.find(
    (item) => String(item.codigo) === String(params.id) || String(item.id) === String(params.id)
  );

  return (
    <PlantillaPublica>
      <Container className="py-5">
        {productoEncontrado ? (
          <InfoProductoDetalle producto={productoEncontrado} />
        ) : (
          <div className="text-center text-white py-5">
            <h2 className="h3 mb-3 text-warning"> Producto no encontrado</h2>
            <p className="text-white-50 mb-4">El producto que buscas no existe o fue removido del catálogo.</p>
            <Boton 
              textoBoton="Volver al Catálogo" 
              alHacerClic={() => navigate('/catalogo')} 
              variante="warning" 
            />
          </div>
        )}
      </Container>
    </PlantillaPublica>
  );
}