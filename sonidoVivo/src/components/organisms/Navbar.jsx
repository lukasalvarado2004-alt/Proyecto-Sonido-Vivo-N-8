import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import Boton from "../atoms/Boton";

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Escuchar cambios de ruta para actualizar los datos del usuario en tiempo real
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

  // Manejador para cerrar sesión y limpiar el almacenamiento local
  const manejarCerrarSesion = () => {
    localStorage.removeItem("sv_sesion");
    localStorage.removeItem("usuarioSesion");
    setUsuario(null);
    navigate("/login");
  };

  // Determinar si el usuario logueado es Administrador
  const rolNormalizado = (usuario?.rol || "").toLowerCase();
  const esAdmin = rolNormalizado === "admin" || rolNormalizado === "administrador";

  // Obtener el nombre a mostrar (nombre, nombreUsuario o fallback)
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

        <NavLink to="/carrito" className="btn btn-outline-warning">
          🛒 Carrito
        </NavLink>

        <NavLink to="/seguimiento" className="btn btn-outline-light">
          🚚 Seguimiento
        </NavLink>

        {/* ÁREA DINÁMICA: SESIÓN ACTIVA VS INVITADO */}
        {usuario ? (
          <>
            {/* SALUDO CON EL NOMBRE DEL USUARIO */}
            <span className="navbar-saludo text-light">
              Hola, <strong className="text-purple-brand">{nombreMostrar}</strong>
            </span>

            {/* BOTÓN SOLO PARA ADMINISTRADORES */}
            {esAdmin && (
              <Boton 
                textoBoton="Panel Admin" 
                variante="purple" 
                alHacerClic={() => navigate("/admin")}
                onClick={() => navigate("/admin")}
              />
            )}

            {/* BOTÓN CERRAR SESIÓN (ÁTOMO) */}
            <Boton 
              textoBoton="Cerrar Sesión" 
              variante="danger" 
              alHacerClic={manejarCerrarSesion}
              onClick={manejarCerrarSesion}
            />
          </>
        ) : (
          <>
            {/* BOTONES SI NO HAY SESIÓN INICIADA */}
            <Boton 
              textoBoton="Iniciar Sesión" 
              variante="purple" 
              alHacerClic={() => navigate("/login")}
              onClick={() => navigate("/login")}
            />

            <Boton 
              textoBoton="Registrarte" 
              variante="purple" 
              alHacerClic={() => navigate("/registro")}
              onClick={() => navigate("/registro")}
            />
          </>
        )}
      </div>
    </nav>
  );
}