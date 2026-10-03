import { useState } from "react";
import Navbar from "./components/organisms/Navbar";
import Login from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";

 const productos = [
  {
    codigo: "GA001",
    categoria: "Guitarras Acústicas",
    nombre: "Guitarra Acústica Folk",
    marca: "Yamaha",
    modelo: "F310",
    stock: 8,
    precio: 129990,
    imagen: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500"
  },
  {
    codigo: "GE001",
    categoria: "Guitarras Eléctricas",
    nombre: "Guitarra Eléctrica Stratocaster",
    marca: "Squier",
    modelo: "Affinity Strat",
    stock: 5,
    precio: 249990,
    imagen: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500"
  },
  {
    codigo: "BA001",
    categoria: "Bajos Eléctricos",
    nombre: "Bajo Eléctrico 4 Cuerdas",
    marca: "Squier",
    modelo: "Affinity PJ",
    stock: 5,
    precio: 299990,
    imagen: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=500"
  },
  {
    codigo: "BT001",
    categoria: "Baterías",
    nombre: "Batería Acústica 5 piezas",
    marca: "Pearl",
    modelo: "Roadshow",
    stock: 2,
    precio: 599990,
    imagen: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=500"
  },
  {
    codigo: "TC001",
    categoria: "Teclados y Pianos",
    nombre: "Teclado Digital 61 teclas",
    marca: "Yamaha",
    modelo: "PSR-E373",
    stock: 4,
    precio: 249990,
    imagen: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500"
  },
  {
    codigo: "AM001",
    categoria: "Amplificadores",
    nombre: "Amplificador Guitarra 15W",
    marca: "Fender",
    modelo: "Frontman 15G",
    stock: 5,
    precio: 99990,
    imagen: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500"
  },
  {
    codigo: "MI001",
    categoria: "Micrófonos",
    nombre: "Micrófono Dinámico Cardioide",
    marca: "Shure",
    modelo: "SM58",
    stock: 8,
    precio: 149990,
    imagen: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500"
  },
  {
    codigo: "PE001",
    categoria: "Pedales de Efectos",
    nombre: "Pedal Distorsión",
    marca: "Boss",
    modelo: "DS-1",
    stock: 7,
    precio: 79990,
    imagen: "https://images.unsplash.com/photo-1563330232-57114bb0823c?w=500"
  },
  {
    codigo: "AC001",
    categoria: "Accesorios",
    nombre: "Cuerdas Guitarra Eléctrica 09-42",
    marca: "Ernie Ball",
    modelo: "Super Slinky",
    stock: 25,
    precio: 8990,
    imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500"
  },
  {
    codigo: "ES001",
    categoria: "Estudio y Grabación",
    nombre: "Interfaz de Audio 2x2 USB",
    marca: "Focusrite",
    modelo: "Scarlett Solo",
    stock: 4,
    precio: 149990,
    imagen: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500"
  }
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
          <Catalogo productos={productos} />
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