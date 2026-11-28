import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import BarraSeguimiento from "../components/molecules/BarraSeguimiento";
import { useTituloPagina } from "../hooks/useTituloPagina";
import Boton from "../components/atoms/Boton";

import { useMisPedidos } from '../hooks/useMisPedidos';

function SeguimientoCompra({ titulo }) {
  useTituloPagina(titulo);
  const navigate = useNavigate();
  
  const { pedidos, mensaje } = useMisPedidos();
  const [seleccion, setSeleccion] = useState('');
  const pedido = pedidos.find(p => String(p.idPedido) === seleccion) || pedidos[0];
  const estados = ['PENDIENTE', 'PREPARANDO', 'EN CAMINO', 'ENTREGADO'];
  const pasoActual = estados.indexOf(pedido?.estadoSeguimiento?.replaceAll('_', ' '));

  return (
    <PlantillaPublica>
      <Container className="py-5 text-white">
        <h1 className="mb-4 text-warning fw-bold text-center">🚚 Seguimiento de tu Pedido</h1>

        {mensaje && <p role="status">{mensaje}</p>}
        {pedido && <Row className="justify-content-center">
          <Col lg={8}>
            <div className="card p-4 p-md-5 shadow-lg compra-tarjeta-oscura text-center">
              
              <label htmlFor="pedido" className="form-label">Selecciona tu pedido</label>
              <select id="pedido" className="form-select mb-4" value={pedido.idPedido} onChange={e => setSeleccion(e.target.value)}>
                {pedidos.map(p => <option key={p.idPedido} value={p.idPedido}>Pedido #{p.idPedido}</option>)}
              </select>
              <p>Código de seguimiento: <strong>{pedido.codigoSeguimiento}</strong></p>

              {pasoActual >= 0 && <BarraSeguimiento pasoActual={pasoActual} estados={estados} />}

              <div className="text-start bg-black bg-opacity-20 p-3 rounded my-4 border border-secondary border-opacity-25">
                <h5 className="text-warning mb-3 fw-bold">📍 Detalles del Despacho</h5>
                <p className="mb-2">
                  <strong>Destino:</strong> {pedido.direccionEnvio}
                </p>
                <p className="mb-0">
                  <strong>Estado Actual:</strong> <span className="text-success fw-bold">{pedido.estadoSeguimiento}</span>
                </p>
              </div>

              <div className="mt-4 d-flex gap-3 justify-content-center">
                <Boton textoBoton="Volver al Catálogo" variante="outline-warning py-2 px-4" alHacerClic={() => navigate("/")} />
              </div>

            </div>
          </Col>
        </Row>}
      </Container>
    </PlantillaPublica>
  );
}

export default SeguimientoCompra;
