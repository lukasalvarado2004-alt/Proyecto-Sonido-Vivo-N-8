// src/App.jsx
import { useState } from "react";
import PlantillaPublica from "./components/templates/PlantillaPublica";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Catalogo from "./pages/Catalogo";
import { productos } from "./data/Productos";

function App() {
  const [vista, setVista] = useState("catalogo");
  const [usuario, setUsuario] = useState(null);

  function manejarIngresoExitoso(correo) {
    setUsuario(correo);
    setVista("catalogo");
  }

  return (
    <PlantillaPublica 
      onIrALogin={() => setVista("login")} 
      onIrACatalogo={() => setVista("catalogo")}
      onIrARegistro={() => setVista("registro")}
    >
      {vista === "catalogo" && (
        <Catalogo productos={productos} />
      )}

      {vista === "login" && (
        <Login 
          onLoginSuccess={manejarIngresoExitoso} 
        />
      )}

      {vista === "registro" && (
        <Registro 
          onRegistroExitoso={manejarIngresoExitoso} 
          onIrALogin={() => setVista("login")}
        />
      )}
    </PlantillaPublica>
  );
}

export default App;