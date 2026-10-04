// src/components/organisms/Navbar.jsx
import React from "react";
import Boton from "../atoms/Boton";

function Navbar({ onIrAInicio, onIrACatalogo }) {
  return (
    <nav className="navbar-custom d-flex justify-content-between align-items-center p-3">
      {/* Brand / Logo */}
      <span className="navbar-logo" style={{ cursor: 'pointer' }} onClick={onIrACatalogo}>
        🎵 Sonido Vivo
      </span>

      {/* Botones de acción usando el átomo Boton */}
      <div className="navbar-actions d-flex gap-2">
        <Boton 
          textoBoton="Catálogo" 
          alHacerClic={onIrACatalogo} 
          variante="outline-light" 
        />
        
        <Boton 
          textoBoton="Iniciar Sesión" 
          alHacerClic={onIrAInicio} 
          variante="warning" 
        />
      </div>
    </nav>
  );
}

export default Navbar;