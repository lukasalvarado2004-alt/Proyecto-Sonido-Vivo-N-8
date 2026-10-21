import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import Boton from "../atoms/Boton";
import { useContenidoCarrito } from "../../context/ContenidoCarrito";

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener el total de productos del carrito desde el contexto
  const { totalProductos } = useContenidoCarrito();

  useEffect(() => {
    const sesionGuardada = localStorage.getItem("sv_sesion") || localStorage.getItem("usuarioSesion");
    if (sesionGuardada) {
      try {
        setUsuario(JSON.parse(sesionGuardada));
      } catch (e) {
        setUsuario(null);
      }
    } else {
      setUsuario(null);
    }
  }, [location.pathname]);

  const manejarCerrarSesion = () => {
    localStorage.removeItem("sv_sesion");
    localStorage.removeItem("usuarioSesion");
    setUsuario(null);
    navigate("/login");
  };

  const rolNormalizado = (usuario?.rol || "").toLowerCase();
  const esAdmin = rolNormalizado === "admin" || rolNormalizado === "administrador";
  const nombreMostrar = usuario?.nombre || usuario?.nombreUsuario || "Usuario";

  return (
    <nav className="navbar-custom">
      {/* LOGO DE LA MARCA */}
      <Link to="/" className="navbar-logo text-decoration-none">
        🎵 Sonido Vivo
      </Link>

      {/* NAVEGACIÓN Y ZONA DE SESIÓN */}
      <div className="navbar-actions">
        <NavLink to="/catalogo" className="btn btn-outline-light">
          Catálogo
        </NavLink>

        {/* BOTÓN DEL CARRITO CON INSIGNIA CIRCULAR */}
        <NavLink to="/carrito" className="btn btn-outline-warning d-inline-flex align-items-center gap-1">
          🛒 Carrito
          {totalProductos > 0 && (
            <span 
              className="badge bg-warning text-dark ms-1 fw-bold rounded-circle d-inline-flex align-items-center justify-content-center"
              style={{ 
                width: "20px", 
                height: "20px", 
                fontSize: "0.7rem", 
                padding: "0" 
              }}
            >
              {totalProductos}
            </span>
          )}
        </NavLink>

        <NavLink to="/seguimiento" className="btn btn-outline-light">
          🚚 Seguimiento
        </NavLink>

        {usuario ? (
          <>
            <span className="navbar-saludo text-light">
              Hola, <strong className="text-purple-brand">{nombreMostrar}</strong>
            </span>

            {esAdmin && (
              <Boton 
                textoBoton="Panel Admin" 
                variante="purple" 
                alHacerClic={() => navigate("/admin")}
              />
            )}

            <Boton 
              textoBoton="Cerrar Sesión" 
              variante="danger" 
              alHacerClic={manejarCerrarSesion}
            />
          </>
        ) : (
          <>
            <Boton 
              textoBoton="Iniciar Sesión" 
              variante="purple" 
              alHacerClic={() => navigate("/login")}
            />

            <Boton 
              textoBoton="Registrarte" 
              variante="purple" 
              alHacerClic={() => navigate("/registro")}
            />
          </>
        )}
      </div>
    </nav>
  );
}