import { Container, Row, Col } from "react-bootstrap";
import TarjetaProducto from "../components/molecules/TarjetaProducto";

function Catalogo(props) {
  function alComprar(nombre) {
    alert('Compraste ' + nombre);
  }

  return (
    <Container>
      <h1 className="my-4">Catálogo de Productos</h1>
      <Row>
        {props.productos.map((p) => (
          <Col key={p.codigo} xs={12} md={6} lg={4} className="mb-3">
            <TarjetaProducto
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
  );
}

export default Catalogo;