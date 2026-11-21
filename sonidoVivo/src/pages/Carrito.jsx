import React from "react";
import { useNavigate } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import VisualCarrito from "../components/organisms/VisualCarrito";
import { useTituloPagina } from '../hooks/useTituloPagina';

function Carrito() {
  const navigate = useNavigate();

  useTituloPagina('Carrito');

  function manejarFinalizarPago() {
    navigate("/confirmar-compra"); 
  }

  return (
    <PlantillaPublica>
      <div className="container py-5 text-white">
        <VisualCarrito onFinalizarPago={manejarFinalizarPago} />
      </div>
    </PlantillaPublica>
  );
}

export default Carrito;