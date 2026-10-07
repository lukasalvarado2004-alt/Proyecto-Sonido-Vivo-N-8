// src/components/organisms/Navbar.jsx
import React from "react";
import Boton from "../atoms/Boton";

function Navbar({ onIrALogin, onIrACatalogo, onIrARegistro }) {
  return (
    <nav className="navbar-custom d-flex justify-content-between align-items-center p-3">
      <span className="navbar-logo" style={{ cursor: 'pointer' }} onClick={onIrACatalogo}>
        🎵 Sonido Vivo
      </span>

      <div className="navbar-actions d-flex gap-2">
        <Boton 
          textoBoton="Catálogo" 
          alHacerClic={onIrACatalogo} 
          variante="outline-light" 
        />
        
        <Boton 
          textoBoton="Iniciar Sesión" 
          alHacerClic={onIrALogin} 
          variante="outline-light" 
        />

        <Boton 
          textoBoton="Registrarse" 
          alHacerClic={onIrARegistro} 
          variante="outline-light" 
        />
      </div>
    </nav>
  );
}

export default Navbar;