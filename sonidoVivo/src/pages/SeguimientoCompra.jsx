import React, { useState, useEffect } from "react";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import { useTituloPagina } from "../hooks/useTituloPagina";
import Boton from "../components/atoms/Boton";

function SeguimientoCompra() {
  useTituloPagina("Seguimiento de Compra");
  const navigate = useNavigate();
  
  // Agregamos la propiedad 'direccion' al estado inicial
  const [infoEnvio, setInfoEnvio] = useState({ nombre: "", comuna: "", direccion: "", nroSolicitud: "" });

  const [pasoActual] = useState(2); 
  const estados = ["Pago Confirmado", "Preparando Pedido", "En Camino", "Entregado"];
  const porcentajeProgreso = (pasoActual / (estados.length - 1)) * 100;

  useEffect(() => {
    const ultimoDespacho = localStorage.getItem("sv_ultimo_despacho");
    const sesion = localStorage.getItem("sv_sesion");

    if (ultimoDespacho) {
      const despacho = JSON.parse(ultimoDespacho);
      setInfoEnvio({
        nombre: despacho.nombre || "Cliente",
        comuna: despacho.comuna || "",
        direccion: despacho.direccion || "",
        // Rescatamos el mismo número de solicitud que se generó en la compra anterior
        nroSolicitud: despacho.nroSolicitud || `SV-${Math.floor(100000 + Math.random() * 900000)}`
      });
    } else if (sesion) {
      const user = JSON.parse(sesion);
      setInfoEnvio({
        nombre: user.nombre || "Cliente",
        comuna: "",
        direccion: "",
        nroSolicitud: `SV-${Math.floor(100000 + Math.random() * 900000)}`
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
                Tu pedido con código <strong className="text-warning">#{infoEnvio.nroSolicitud}</strong> está en camino.
              </p>

              <div className="my-4 px-3">
                <ProgressBar now={porcentajeProgreso} variant="warning" className="bg-secondary" style={{ height: "10px" }} />
                <div className="d-flex justify-content-between mt-3 text-start small">
                  {estados.map((text, index) => (
                    <div key={index} className={`fw-bold ${index <= pasoActual ? "text-warning" : "text-white-50"}`} style={{ width: "23%", textAlign: "center" }}>
                      <div className="fs-4 mb-1">{index === 0 ? "🧾" : index === 1 ? "📦" : index === 2 ? "🚛" : "🏠"}</div>
                      <span className="d-none d-sm-inline">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-start bg-black bg-opacity-20 p-3 rounded my-4 border border-secondary border-opacity-25">
                <h5 className="text-warning mb-3 fw-bold">📍 Detalles del Despacho</h5>
                <p className="mb-2"><strong>Destinatario:</strong> {infoEnvio.nombre}</p>
                
                {/* CORREGIDO: Muestra tanto la dirección como la comuna de forma clara */}
                <p className="mb-2">
                  <strong>Destino:</strong> {infoEnvio.direccion ? `${infoEnvio.direccion}, ${infoEnvio.comuna}` : infoEnvio.comuna || "No especificado"}, Chile
                </p>
                
                <p className="mb-0"><strong>Estado Actual:</strong> <span className="text-success fw-bold">{estados[pasoActual]}</span></p>
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
