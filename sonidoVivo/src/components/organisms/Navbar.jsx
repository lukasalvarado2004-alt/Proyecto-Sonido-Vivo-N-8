import React from "react";

function Navbar({ onIrAInicio, onIrACatalogo }) {
  return (
    <nav className="navbar-custom">
      {/* Brand / Logo */}
      <span className="navbar-logo" onClick={onIrACatalogo}>
        🎵 Sonido Vivo
      </span>

      {/* Botones de acción */}
      <div className="navbar-actions">
        <button 
          className="btn btn-outline-light" 
          onClick={onIrACatalogo}
        >
          Catálogo
        </button>
        
        <button 
          className="btn btn-primary" 
          onClick={onIrAInicio}
        >
          Iniciar Sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;