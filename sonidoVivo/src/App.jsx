import { useState } from "react";
import PlantillaPublica from "./components/templates/PlantillaPublica";
import Login from "./pages/Login";
import Catalogo from "./pages/Catalogo";
import Carrito from "./pages/Carrito"; // Importación de la página existente
import { productos } from "./data/Productos";
import { ContenidoCarritoProvider } from "./data/ContenidoCarrito"; 

function App() {
  const [vista, setVista] = useState("catalogo");
  const [usuario, setUsuario] = useState(null);

  function manejarLoginExitoso(correo) {
    setUsuario(correo);
    alert("¡Bienvenido a Sonido Vivo! Has iniciado sesión como: " + correo);
  }

  return (
    <ContenidoCarritoProvider>
      <PlantillaPublica 
        onIrAInicio={() => setVista("login")} 
        onIrACatalogo={() => setVista("catalogo")}
        onIrAlCarrito={() => setVista("carrito")} // Inyectamos la prop necesaria hacia la plantilla
      >
        {vista === "catalogo" ? (
          <Catalogo productos={productos} />
        ) : vista === "carrito" ? (
          <Carrito />
        ) : (
          <>
            {!usuario ? (
              <Login onLoginSuccess={manejarLoginExitoso} />
            ) : (
              <div className="container mt-5 text-center">
                <h1 className="display-4 mb-3">Plataforma Sonido Vivo</h1>
                <p className="lead">
                  Sesión activa: <strong>{usuario}</strong>
                </p>
                <button 
                  className="btn btn-danger mt-4" 
                  onClick={() => setUsuario(null)}
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </>
        )}
      </PlantillaPublica>
    </ContenidoCarritoProvider>
  );
}

export default App;
