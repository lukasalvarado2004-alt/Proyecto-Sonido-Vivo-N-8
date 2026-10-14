import { Row, Col } from "react-bootstrap";
import TarjetaProducto from "../molecules/TarjetaProducto";

function CatalogoProducto(props) {
  const productos = props.productos || [];

  return (
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
            onComprar={props.onComprar ? () => props.onComprar(p.nombre) : undefined}
          />
        </Col>
      ))}
    </Row>
  );
}

export default CatalogoProducto;