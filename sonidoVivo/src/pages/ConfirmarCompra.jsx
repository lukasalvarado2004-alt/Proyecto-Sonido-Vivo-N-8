import React, { useState } from "react"; 
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContenidoCarrito } from "../context/ContenidoCarrito";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import { useTituloPagina } from "../hooks/useTituloPagina";
import Boton from "../components/atoms/Boton";

function ConfirmarCompra(props) {
  const { items, precioTotal, vaciarCarrito } = useContenidoCarrito();
  const [errores, setErrores] = useState({});
  const [compraExitosa, setCompraExitosa] = useState(false);
  const navigate = useNavigate();

  useTituloPagina("Confirmar Compra");

  function ejecutarCompraManual() {
    const nombreInput = document.querySelector('input[name="nombreCompleto"]');
    const emailInput = document.querySelector('input[name="correoElectronico"]');
    const direccionInput = document.querySelector('input[name="direccionEnvio"]');
    const comunaInput = document.querySelector('input[name="ciudadComuna"]');

    const nombre = nombreInput ? nombreInput.value : "";
    const email = emailInput ? emailInput.value : "";
    const direccion = direccionInput ? direccionInput.value : "";
    const comuna = comunaInput ? comunaInput.value : "";

    let erroresTemporales = {};

    if (!nombre.trim()) erroresTemporales.nombreCompleto = "El nombre completo es obligatorio.";
    if (!email.trim()) erroresTemporales.correoElectronico = "El correo electrónico es obligatorio.";
    if (!direccion.trim()) erroresTemporales.direccionEnvio = "La dirección de envío es obligatoria.";
    if (!comuna.trim()) erroresTemporales.ciudadComuna = "La ciudad o comuna es obligatoria.";

    setErrores(erroresTemporales);

    if (Object.keys(erroresTemporales).length > 0) {
      return;
    }

    vaciarCarrito();
    setCompraExitosa(true);
  }

  return (
    <PlantillaPublica>
      <Container className="py-5 text-white">
        <h1 className="mb-4 text-warning fw-bold text-center">📦 Finalizar tu Compra</h1>
        
        {compraExitosa ? (
          <div className="card p-5 shadow-lg compra-tarjeta-oscura compra-vista-exito text-center">
            <h2 className="text-success fw-bold mb-3">🎉 ¡Compra Realizada con Éxito!</h2>
            <p className="fs-5 mb-4 text-white">
              Muchas gracias por comprar en Sonido Vivo. Tu pedido ya está siendo procesado y va en camino.
            </p>
            <Boton 
              textoBoton="Volver al Catálogo" 
              variante="warning text-white py-2 fs-5"
              alHacerClic={() => navigate("/")}
            />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-5">
            <p className="fs-4 text-white-50">No tienes productos en el carrito para procesar un pago.</p>
            <button className="btn btn-warning mt-3 text-white fw-bold" onClick={() => navigate("/")}>Volver al Catálogo</button>
          </div>
        ) : (
          <Row className="g-4 justify-content-center">
          
            <Col lg={6}>
              <div className="card p-4 shadow-lg compra-tarjeta-oscura">
                <h3 className="text-center text-white m-0 fs-5 fw-normal">Bienvenid@ a</h3>
                <h2 className="login-titulo-marca text-center text-white mb-4">
                  Sonido <span className="text-purple-brand">Vivo</span>
                </h2>
                <p className="text-center mb-4 text-white-50 small">Por favor ingresa tus datos para el despacho</p>
                
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-3">
                    <input 
                      type="text" 
                      name="nombreCompleto" 
                      placeholder="Nombre Completo" 
                      className="compra-input-control" 
                    />
                    {errores.nombreCompleto && <div className="text-danger small mt-2 ms-1 fw-bold"> {errores.nombreCompleto}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <input 
                      type="text" 
                      name="correoElectronico" 
                      placeholder="Correo Electrónico" 
                      className="compra-input-control" 
                    />
                    {errores.correoElectronico && <div className="text-danger small mt-2 ms-1 fw-bold"> {errores.correoElectronico}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <input 
                      type="text" 
                      name="direccionEnvio" 
                      placeholder="Dirección de Envío" 
                      className="compra-input-control" 
                    />
                    {errores.direccionEnvio && <div className="text-danger small mt-2 ms-1 fw-bold"> {errores.direccionEnvio}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <input 
                      type="text" 
                      name="ciudadComuna" 
                      placeholder="Ciudad / Comuna" 
                      className="compra-input-control" 
                    />
                    {errores.ciudadComuna && <div className="text-danger small mt-2 ms-1 fw-bold"> {errores.ciudadComuna}</div>}
                  </div>

                  <div className="mt-4">
                    <Boton 
                      textoBoton="CONFIRMAR Y PAGAR PEDIDO" 
                      variante="purple w-100 fw-bold py-2 fs-5 text-white"
                      tipo="button"
                      alHacerClic={ejecutarCompraManual}
                    />
                  </div>
                </form>
              </div>
            </Col>

            <Col lg={5}>
              <div className="card p-4 shadow-lg compra-tarjeta-oscura">
                <h3 className="h5 mb-4 text-warning fw-bold">🧾 Resumen del Pedido</h3>
                <div className="d-flex flex-column gap-3 mb-4">
                  {items.map((item) => (
                    <div key={item.producto.id} className="d-flex justify-content-between align-items-center pb-2 compra-borde-resumen">
                      <div>
                        <span className="fw-semibold text-white">{item.producto.nombre}</span>
                        <small className="text-white-50 d-block">Cantidad: {item.cantidad}</small>
                      </div>
                      <span className="fw-bold text-white">{"$" + (item.producto.precio * item.cantidad).toLocaleString('es-CL')}</span>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-between align-items-center pt-2">
                  <span className="fs-5 text-white-50">Total a Pagar:</span>
                  <strong className="fs-3 text-warning">{"$" + precioTotal.toLocaleString('es-CL')}</strong>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </PlantillaPublica>
  );
} 

export default ConfirmarCompra;
