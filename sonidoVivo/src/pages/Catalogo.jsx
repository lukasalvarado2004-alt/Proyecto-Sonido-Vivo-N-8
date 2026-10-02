import { Container, Row, Col } from "react-bootstrap";
import TarjetaProducto from "../components/molecules/TarjetaProducto";

function Catalogo(props) {
  function alComprar(nombre) {
    alert('Compraste ' + nombre);
  }

  return (
    <Container>
      <Row>
        {props.mascotas.map((m) => (
          <Col key={m.id} xs={12} md={6} lg={4} className="mb-3">
            <TarjetaProducto
              nombre={m.nombre}
              precio={m.precio}
              onComprar={() => alComprar(m.nombre)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Catalogo;