import React, { useState, useEffect } from "react"; 
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContenidoCarrito } from "../context/ContenidoCarrito";
import { useProductos } from "../context/ProductosContext"; 
import PlantillaPublica from "../components/templates/PlantillaPublica";
import { useTituloPagina } from "../hooks/useTituloPagina";
import Boton from "../components/atoms/Boton";
import { validarNombre, validarCorreo } from "../utils/validaciones.js";
import { ResumenPedido } from "../components/molecules/ResumenPedido";
import comprasData from '../data/CompraData.json'; // IMPORTAMOS DATA INICIAL

function ConfirmarCompra() {
  const { items, precioTotal, vaciarCarrito } = useContenidoCarrito();
  const { productos, actualizarStockProducto } = useProductos(); 
  
  const [errores, setErrores] = useState({});
  const [compraExitosa, setCompraExitosa] = useState(false);
  const navigate = useNavigate();
  useTituloPagina("Confirmar Compra");

  const [datosOrdenFinal, setDatosOrdenFinal] = useState(null);

  const [formulario, setFormulario] = useState({
    nombreCompleto: "", correoElectronico: "", direccionEnvio: "", ciudadComuna: ""
  });

  useEffect(() => {
    const sesion = localStorage.getItem("sv_sesion");
    if (sesion) {
      const user = JSON.parse(sesion);
      setFormulario(p => ({
        ...p,
        nombreCompleto: user.nombre || "",
        correoElectronico: user.correo || user.email || ""
      }));
    }
  }, []);

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  function ejecutarCompraManual() {
    let err = {};
    const errNom = validarNombre(formulario.nombreCompleto);
    const errCor = validarCorreo(formulario.correoElectronico);

    if (errNom) err.nombreCompleto = errNom;
    if (errCor) err.correoElectronico = errCor;
    if (!formulario.direccionEnvio.trim()) err.direccionEnvio = "La dirección de envío es obligatoria.";
    if (!formulario.ciudadComuna.trim()) err.ciudadComuna = "La ciudad o comuna es obligatoria.";

    setErrores(err);
    if (Object.keys(err).length > 0) return;

    // DESCONTAR STOCK
    items.forEach((item) => {
      const idProducto = item.producto.id || item.producto.codigo;
      const productoExistente = productos.find(
        (p) => String(p.id) === String(idProducto) || String(p.codigo) === String(idProducto)
      );

      if (productoExistente) {
        const nuevoStock = Math.max(0, Number(productoExistente.stock) - Number(item.cantidad));
        actualizarStockProducto(idProducto, nuevoStock);
      }
    });

    const numeroTicket = `SV-${Math.floor(100000 + Math.random() * 900000)}`;
    
    const nuevaCompra = {
      nroSolicitud: numeroTicket,
      nombre: formulario.nombreCompleto,
      correo: formulario.correoElectronico,
      comuna: formulario.ciudadComuna,
      direccion: formulario.direccionEnvio,
      items: [...items],
      total: precioTotal
    };

    setDatosOrdenFinal(nuevaCompra);
    localStorage.setItem("sv_ultimo_despacho", JSON.stringify(nuevaCompra));

    // SOLUCIÓN: Guardar en localStorage uniendo las del JSON con la nueva
    let historialExistente = JSON.parse(localStorage.getItem("sv_todas_compras"));
    if (!historialExistente) {
      historialExistente = [...comprasData]; // Si está vacío, cargar las de prueba
    }
    historialExistente.push(nuevaCompra);
    localStorage.setItem("sv_todas_compras", JSON.stringify(historialExistente));

    vaciarCarrito();
    setCompraExitosa(true);
  }

  return (
    <PlantillaPublica>
      <Container className="py-5 text-white">
        <h1 className="mb-4 text-warning fw-bold text-center">📦 Finalizar tu Compra</h1>
        
        {compraExitosa ? (
          <div className="card p-4 p-md-5 shadow-lg compra-tarjeta-oscura text-center mx-auto" style={{ maxWidth: "650px" }}>
            <h2 className="text-success fw-bold mb-2">🎉 ¡Compra Realizada con Éxito!</h2>
            <p className="text-white-50 mb-4">Muchas gracias por comprar en Sonido Vivo.</p>
            
            <ResumenPedido compra={datosOrdenFinal} />

            <div className="mt-4">
              <Boton 
                textoBoton="Ver Seguimiento de mi Pedido" 
                variante="purple w-100 fw-bold py-2 fs-5 text-white" 
                alHacerClic={() => navigate("/seguimiento")} 
              />
            </div>
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
                <h3 className="text-center m-0 fs-5 fw-normal">Bienvenid@ a</h3>
                <h2 className="login-titulo-marca text-center mb-4">Sonido <span className="text-purple-brand">Vivo</span></h2>
                
                <form onSubmit={(e) => e.preventDefault()}>
                  {["nombreCompleto", "correoElectronico", "direccionEnvio", "ciudadComuna"].map((campo) => (
                    <div className="mb-3" key={campo}>
                      <input 
                        type={campo === "correoElectronico" ? "email" : "text"} 
                        name={campo} 
                        placeholder={campo === "nombreCompleto" ? "Nombre Completo" : campo === "correoElectronico" ? "Correo Electrónico" : campo === "direccionEnvio" ? "Dirección de Envío" : "Ciudad / Comuna"} 
                        className="compra-input-control" 
                        value={formulario[campo]} 
                        onChange={manejarCambio} 
                      />
                      {errores[campo] && <div className="text-danger small mt-2 ms-1 fw-bold">{errores[campo]}</div>}
                    </div>
                  ))}
                  <div className="mt-4">
                    <Boton textoBoton="CONFIRMAR Y PAGAR PEDIDO" variante="purple w-100 fw-bold py-2 fs-5 text-white" tipo="button" alHacerClic={ejecutarCompraManual} />
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
                        <span className="fw-semibold">{item.producto.nombre}</span>
                        <small className="text-white-50 d-block">Cantidad: {item.cantidad}</small>
                      </div>
                      <span className="fw-bold">{`$${(item.producto.precio * item.cantidad).toLocaleString('es-CL')}`}</span>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-between align-items-center pt-2">
                  <span className="fs-5 text-white-50">Total a Pagar:</span>
                  <strong className="fs-3 text-warning">{`$${precioTotal.toLocaleString('es-CL')}`}</strong>
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