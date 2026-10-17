// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Catalogo from "./pages/Catalogo";
import Carrito from "./pages/Carrito";
import Registro from "./pages/Registro";
import Admin from "./pages/AdminProductos";
import NoEncontrada from "./pages/NoEncontrada";
import { ContenidoCarritoProvider } from "./data/ContenidoCarrito";
import { ProductosProvider } from "./context/ProductosContext"; 

function App() {
  return (
    <ContenidoCarritoProvider>
      <ProductosProvider> 
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Catalogo />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NoEncontrada />} />
          </Routes> 
        </BrowserRouter>
      </ProductosProvider>
    </ContenidoCarritoProvider>
  );
}

export default App;
