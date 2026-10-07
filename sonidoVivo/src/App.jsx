import { useState } from "react";
import PlantillaPublica from "./components/templates/PlantillaPublica";
import Login from "./pages/Login";
import Catalogo from "./pages/Catalogo";
import { productos } from "./data/Productos";

function App() {
  const [vista, setVista] = useState("catalogo");
  const [usuario, setUsuario] = useState(null);

  function manejarLoginExitoso(correo) {
    setUsuario(correo);
    alert("¡Bienvenido a Sonido Vivo! Has iniciado sesión como: " + correo);
  }

  return (
    <PlantillaPublica 
      onIrAInicio={() => setVista("login")} 
      onIrACatalogo={() => setVista("catalogo")}
    >
      {vista === "catalogo" ? (
        <Catalogo productos={productos} />
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
  );
}

export default App;