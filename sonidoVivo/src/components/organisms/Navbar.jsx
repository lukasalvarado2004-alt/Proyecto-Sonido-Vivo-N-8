import React from "react";
import Boton from "../atoms/Boton";
import { useContenidoCarrito } from "../../data/ContenidoCarrito";

function Navbar(props) {
  const { totalProductos } = useContenidoCarrito();

  return (
    <nav className="navbar-custom d-flex justify-content-between align-items-center p-3">
      <span className="navbar-logo" style={{ cursor: 'pointer' }} onClick={props.onIrACatalogo}>
        🎵 Sonido Vivo
      </span>


      <div className="navbar-actions d-flex gap-2 align-items-center text-nowrap">
        <Boton 
          textoBoton={`Carrito (${totalProductos})`} 
          alHacerClic={props.onIrAlCarrito} 
          variante="outline-light" 
        />

        <Boton 
          textoBoton="Catálogo" 
          alHacerClic={props.onIrACatalogo} 
          variante="outline-light" 
        />
        
        <Boton 
          textoBoton="Iniciar Sesión" 
          alHacerClic={props.onIrAInicio} 
          variante="warning" 
        />
      </div>
    </nav>
  );
}

export default Navbar;
