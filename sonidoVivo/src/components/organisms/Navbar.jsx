import React from "react";
import Boton from "../atoms/Boton";

function Navbar(props) {
  return (
    <nav className="navbar-custom d-flex justify-content-between align-items-center p-3">
      <span className="navbar-logo" style={{ cursor: 'pointer' }} onClick={props.onIrACatalogo}>
        🎵 Sonido Vivo
      </span>

      <div className="navbar-actions d-flex gap-2">
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