import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import InfoProductoDetalle from '../components/organisms/InfoProductoDetalle';
import Boton from '../components/atoms/Boton';
import productos from '../data/Productos.json'; 
import PlantillaPublica from '../components/templates/PlantillaPublica';

export default function DetalleProducto(props) {
  // 1. Leemos el 'id' enviado en la URL (/producto/:id)
  const params = useParams();
  const navigate = useNavigate();

  // 2. Buscamos el producto en la lista según el código o id de la URL
  const productoEncontrado = productos.find(
    (item) => item.codigo === params.id || String(item.id) === params.id
  );

  function manejarVolver() {
    navigate('/catalogo');
  }

  function manejarAgregarAlCarrito(producto, cantidad) {
    alert(`Agregaste ${cantidad} unidad(es) de ${producto.nombre} al carrito.`);
  }

  return (
     <PlantillaPublica>
    <Container className="py-4">
      <div className="mb-3">
        <Boton
          textoBoton="← Volver al Catálogo"
          variante="outline-dark"
          alHacerClic={manejarVolver}
        />
      </div>

      {/* 3. Enviamos el producto encontrado como prop al organismo */}
      <InfoProductoDetalle
        producto={productoEncontrado}
        onAgregarAlCarrito={manejarAgregarAlCarrito}
      />
    </Container>
    </PlantillaPublica>
  );
}