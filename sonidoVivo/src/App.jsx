import { useState } from "react";
import Login from "./pages/Inicio";

function App() {
  const [usuario, setUsuario] = useState(null);

  function manejarLoginExitoso(correo) {
    setUsuario(correo);
    alert("¡Bienvenido a Sonido Vivo! Has iniciado sesión como: " + correo);
  }

  return (
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
  );
}

export default App;