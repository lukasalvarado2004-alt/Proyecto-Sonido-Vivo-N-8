import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar-custom">
      <Link to="/" className="navbar-logo text-decoration-none">
        🎵 Sonido Vivo
      </Link>

      <div className="navbar-actions">
        <NavLink to="/catalogo" className="btn btn-outline-light">
          Catálogo
        </NavLink>
        <NavLink to="/carrito" className="btn btn-outline-warning">
          🛒 Carrito
        </NavLink>
        <NavLink to="/login" className="btn btn-primary">
          Iniciar Sesión
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;