// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Catalogo from "./pages/Catalogo";
import Carrito from "./pages/Carrito";
import Registro from "./pages/Registro";
import Admin from "./pages/AdminProductos";
import NoEncontrada from "./pages/NoEncontrada";
import productos from "./data/Productos.json";
import { ContenidoCarritoProvider } from "./data/ContenidoCarrito";

function App() {
  return (
    <ContenidoCarritoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Catalogo productos={productos} />} />
          <Route path="/catalogo" element={<Catalogo productos={productos} />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
           <Route path="*" element={<NoEncontrada />} />
        </Routes> 
      </BrowserRouter>
    </ContenidoCarritoProvider>
  );
}

export default App;
