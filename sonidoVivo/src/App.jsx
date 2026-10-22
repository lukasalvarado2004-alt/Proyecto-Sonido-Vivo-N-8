import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import Carrito from "./pages/Carrito";
import Registro from "./pages/Registro";
import Admin from "./pages/AdminProductos";
import NoEncontrada from "./pages/NoEncontrada";
import productos from "./data/Productos.json";
import { ContenidoCarritoProvider } from "./context/ContenidoCarrito";
import { ProductosProvider } from "./context/ProductosContext";
import ConfirmarCompra from './pages/ConfirmarCompra';
import SeguimientoCompra from './pages/SeguimientoCompra';
import DetalleProducto from './pages/DetalleProducto';

function App() {
  return (
    <ProductosProvider>
      <ContenidoCarritoProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/catalogo" element={<Catalogo productos={productos} />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />            
            <Route path="/admin" element={<Admin productos={productos} />} />
            <Route path="/confirmar-compra" element={<ConfirmarCompra />} />
            <Route path="/seguimiento" element={<SeguimientoCompra />} />
            <Route path="*" element={<NoEncontrada />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
          </Routes>
        </BrowserRouter>
      </ContenidoCarritoProvider>
    </ProductosProvider>
  );
}

export default App;