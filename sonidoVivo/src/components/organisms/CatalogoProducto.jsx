import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TarjetaProducto from "../molecules/TarjetaProducto";

function CatalogoProducto(props) {
  const navigate = useNavigate();
  const productos = props.productos || [];

  function manejarIrADetalle(idProducto) {
    navigate(`/producto/${idProducto}`);
  }

  return (
    <Row>
      {productos.map((p) => {
        const idActual = p.codigo || p.id;

        return (
          <Col key={idActual} xs={12} md={6} lg={4} className="mb-3">
            <TarjetaProducto
              id={idActual}
              imagen={p.imagen}
              nombre={p.nombre}
              marca={p.marca}
              modelo={p.modelo}
              stock={p.stock}
              precio={p.precio}
              esOferta={p.esOferta}
              precioAnterior={p.precioAnterior}
              onComprar={() => manejarIrADetalle(idActual)}
            />
          </Col>
        );
      })}
    </Row>
  );
}

export default CatalogoProducto;