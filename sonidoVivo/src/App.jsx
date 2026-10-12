import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Catalogo from "./pages/Catalogo";
import Carrito from "./pages/Carrito";
import { productos } from "./data/Productos";
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
          <Route path="*" element={<h1 className="text-white text-center mt-5">404 - Página no encontrada</h1>} />
        </Routes> 
      </BrowserRouter>
    </ContenidoCarritoProvider>
  );
}

export default App;