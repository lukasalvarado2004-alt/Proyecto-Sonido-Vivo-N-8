import { Container, Row, Col } from "react-bootstrap";
import TarjetaProducto from "../components/molecules/TarjetaProducto";
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useTituloPagina } from '../hooks/useTituloPagina'

function Catalogo({ productos = [] }) {
  function alComprar(nombre) {
    alert('Compraste ' + nombre);
  }

   useTituloPagina('Catalogo')

  return (
    <PlantillaPublica>
      <Container className="py-4">
        <h1 className="my-4 text-white">Catálogo de Productos</h1>
        <Row>
          {productos.map((p) => (
            <Col key={p.codigo || p.id} xs={12} md={6} lg={4} className="mb-3">
              <TarjetaProducto
                id={p.codigo || p.id}
                imagen={p.imagen}
                nombre={p.nombre}
                marca={p.marca}
                modelo={p.modelo}
                stock={p.stock}
                precio={p.precio}
                onComprar={() => alComprar(p.nombre)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default Catalogo;