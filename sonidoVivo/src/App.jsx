import { useState } from "react";
import Navbar from "./components/organisms/Navbar";
import Login from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";

const mascotas = [
  { id: 1, nombre: "Guitarra", precio: 1000 },
  { id: 2, nombre: "Bateria", precio: 2000 },
  { id: 3, nombre: "Bajo", precio: 1500 },
  { id: 4, nombre: "Teclado", precio: 3000 },
];

function App() {
  // Estado para controlar la pantalla actual ('catalogo' por defecto)
  const [vista, setVista] = useState("catalogo");

  // Estado para guardar la sesión del usuario
  const [usuario, setUsuario] = useState(null);

  function manejarLoginExitoso(correo) {
    setUsuario(correo);
    alert("¡Bienvenido a Sonido Vivo! Has iniciado sesión como: " + correo);
  }

  return (
    <div>
      {/* Navbar que permite cambiar entre páginas */}
      <Navbar 
        onIrAInicio={() => setVista("inicio")} 
        onIrACatalogo={() => setVista("catalogo")} 
      />

      {/* Renderizado condicional según la vista seleccionada */}
      <main>
        {vista === "catalogo" ? (
          <Catalogo mascotas={mascotas} />
        ) : (
          /* Vista de Inicio / Login */
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
      </main>
    </div>
  );
}

export default App;