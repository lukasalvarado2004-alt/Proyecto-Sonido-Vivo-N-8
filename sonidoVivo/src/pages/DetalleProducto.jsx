import React from 'react';
import { Container } from 'react-bootstrap';
import InfoProductoDetalle from '../components/organisms/InfoProducto';
import Boton from '../components/atoms/Boton';

export default function DetalleProducto(props) {
  return (
    <Container className="py-4">
      {/* Botón superior para regresar */}
      <div className="mb-3">
        <Boton
          textoBoton="← Volver al Catálogo"
          variante="outline-dark"
          alHacerClic={props.onVolver}
        />
      </div>

      {/* Organismo principal enviado desde props */}
      <InfoProductoDetalle
        producto={props.producto}
        onAgregarAlCarrito={props.onAgregarAlCarrito}
      />
    </Container>
  );
}