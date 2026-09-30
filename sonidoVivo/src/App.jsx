// src/App.jsx
import { useState } from "react";
import Login from "./pages/Inicio";

function App() {
  // Estado para saber si el usuario ya inició sesión
  const [usuario, setUsuario] = useState(null);

  // Función que se ejecuta cuando el login es correcto
  function manejarLoginExitoso(correo) {
    setUsuario(correo);
    alert("¡Bienvenido a Sonido Vivo! Has iniciado sesión como: " + correo);
  }

  return (
    <>
      {/* Si no hay un usuario guardado en el estado, mostramos el Login */}
      {!usuario ? (
        <Login onLoginSuccess={manejarLoginExitoso} />
      ) : (
        // Si ya hay usuario, mostramos la pantalla de bienvenida del sistema
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