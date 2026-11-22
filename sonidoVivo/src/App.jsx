// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ProductosProvider } from './context/ProductosContext';
import { ContenidoCarritoProvider } from './context/ContenidoCarrito';
import RutaProtegida from './routes/RutaProtegida';

import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import DetalleProducto from './pages/DetalleProducto';
import Carrito from './pages/Carrito';
import ConfirmarCompra from './pages/ConfirmarCompra';
import SeguimientoCompra from './pages/SeguimientoCompra';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Contacto from './pages/Contacto';
import DetalleBlog from './pages/NosotrosHistoria';
import AdminProductos from './pages/AdminProductos';
import PanelVentas from './pages/PanelVentas';
import NoEncontrada from './pages/NoEncontrada';

const rolesAdmin = ['admin', 'administrador'];
const rolesVentas = [...rolesAdmin, 'ventas', 'vendedor'];

export default function App() {
  return (
    <ProductosProvider>
      <ContenidoCarritoProvider>
        <BrowserRouter>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Inicio />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/confirmar-compra" element={<ConfirmarCompra />} />
            <Route path="/seguimiento" element={<SeguimientoCompra />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/blog" element={<DetalleBlog />} />

            {/* Solo administradores */}
            <Route element={<RutaProtegida roles={rolesAdmin} />}>
              <Route
                path="/admin"
                element={<Navigate to="/admin/productos" replace />}
              />
              <Route path="/admin/productos" element={<AdminProductos />} />
            </Route>

            {/* Administradores y vendedores */}
            <Route element={<RutaProtegida roles={rolesVentas} />}>
              <Route path="/ventas" element={<PanelVentas />} />
              <Route path="/admin/ventas" element={<PanelVentas />} />
            </Route>

            <Route path="*" element={<NoEncontrada />} />
          </Routes>
        </BrowserRouter>
      </ContenidoCarritoProvider>
    </ProductosProvider>
  );
}