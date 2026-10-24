import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import BarraSeguimiento from "../components/molecules/BarraSeguimiento";
import { useTituloPagina } from "../hooks/useTituloPagina";
import Boton from "../components/atoms/Boton";

function SeguimientoCompra() {
  useTituloPagina("Seguimiento de Compra");
  const navigate = useNavigate();
  
  const [infoEnvio, setInfoEnvio] = useState({ nombre: "", comuna: "", direccion: "", nroSolicitud: "" });
  const [pasoActual, setPasoActual] = useState(0);

  const estados = ["Pago Confirmado", "Preparando Pedido", "En Camino", "Entregado"];

  useEffect(() => {
    const ultimoDespacho = localStorage.getItem("sv_ultimo_despacho");
    const historialCompras = localStorage.getItem("sv_todas_compras");
    const sesion = localStorage.getItem("sv_sesion");

    let nroSolicitudActual = "";
    let datosBase = null;

    if (ultimoDespacho) {
      datosBase = JSON.parse(ultimoDespacho);
      nroSolicitudActual = datosBase.nroSolicitud;
    } else if (sesion) {
      const user = JSON.parse(sesion);
      datosBase = {
        nombre: user.nombre || "Cliente",
        comuna: "",
        direccion: "",
        nroSolicitud: `SV-523423`
      };
      nroSolicitudActual = datosBase.nroSolicitud;
    }

    if (datosBase) {
      // Buscar si el Ejecutivo de Ventas actualizó el estado de esta solicitud específica
      let estadoActualTexto = "Pago Confirmado";

      if (historialCompras) {
        const lista = JSON.parse(historialCompras);
        const ordenEncontrada = lista.find((item) => item.nroSolicitud === nroSolicitudActual);
        if (ordenEncontrada && ordenEncontrada.estado) {
          estadoActualTexto = ordenEncontrada.estado;
        }
      }

      // Mapear el texto del estado con el índice numérico de la barra
      const indiceEstado = estados.findIndex(
        (e) => e.toLowerCase() === estadoActualTexto.toLowerCase()
      );

      setPasoActual(indiceEstado !== -1 ? indiceEstado : 0);

      setInfoEnvio({
        nombre: datosBase.nombre || "Cliente",
        comuna: datosBase.comuna || "",
        direccion: datosBase.direccion || "",
        nroSolicitud: nroSolicitudActual
      });
    }
  }, []);

  return (
    <PlantillaPublica>
      <Container className="py-5 text-white">
        <h1 className="mb-4 text-warning fw-bold text-center">🚚 Seguimiento de tu Pedido</h1>

        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="card p-4 p-md-5 shadow-lg compra-tarjeta-oscura text-center">
              
              <h3 className="text-success fw-bold mb-2">¡Hola, {infoEnvio.nombre}!</h3>
              <p className="text-white-50 mb-4">
                Tu pedido con código <strong className="text-warning">#{infoEnvio.nroSolicitud}</strong> se encuentra en procesamiento.
              </p>

              <BarraSeguimiento pasoActual={pasoActual} estados={estados} />

              <div className="text-start bg-black bg-opacity-20 p-3 rounded my-4 border border-secondary border-opacity-25">
                <h5 className="text-warning mb-3 fw-bold">📍 Detalles del Despacho</h5>
                <p className="mb-2"><strong>Destinatario:</strong> {infoEnvio.nombre}</p>
                <p className="mb-2">
                  <strong>Destino:</strong> {infoEnvio.direccion ? `${infoEnvio.direccion}, ${infoEnvio.comuna}` : infoEnvio.comuna || "No especificado"}, Chile
                </p>
                <p className="mb-0">
                  <strong>Estado Actual:</strong> <span className="text-success fw-bold">{estados[pasoActual] || "Pendiente"}</span>
                </p>
              </div>

              <div className="mt-4 d-flex gap-3 justify-content-center">
                <Boton textoBoton="Volver al Catálogo" variante="outline-warning py-2 px-4" alHacerClic={() => navigate("/")} />
              </div>

            </div>
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default SeguimientoCompra;