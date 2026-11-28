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

export default function App({ basename }) {
  return (
    <ProductosProvider>
      <ContenidoCarritoProvider>
        <BrowserRouter basename={basename}>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Inicio titulo="Inicio" />} />
            <Route path="/catalogo" element={<Catalogo titulo="Catálogo" />} />
            <Route path="/producto/:id" element={<DetalleProducto rutaCatalogo="/catalogo" />} />
            <Route path="/carrito" element={<Carrito titulo="Carrito" />} />
            <Route element={<RutaProtegida />}>
              <Route path="/confirmar-compra" element={<ConfirmarCompra titulo="Confirmar compra" />} />
              <Route path="/seguimiento" element={<SeguimientoCompra titulo="Seguimiento de compra" />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/contacto" element={<Contacto titulo="Contacto" />} />
            <Route path="/blog" element={<DetalleBlog titulo="Blog - Historia de Sonido Vivo" />} />

            {/* Solo administradores */}
            <Route element={<RutaProtegida roles={rolesAdmin} />}>
              <Route
                path="/admin"
                element={<Navigate to="/admin/productos" replace />}
              />
              <Route path="/admin/productos" element={<AdminProductos titulo="Panel de Administración" />} />
            </Route>

            {/* Administradores y vendedores */}
            <Route element={<RutaProtegida roles={rolesVentas} />}>
              <Route path="/ventas" element={<PanelVentas titulo="Panel de Ventas" />} />
              <Route path="/admin/ventas" element={<PanelVentas titulo="Panel de Ventas" />} />
            </Route>

            <Route path="*" element={<NoEncontrada titulo="Página no encontrada" />} />
          </Routes>
        </BrowserRouter>
      </ContenidoCarritoProvider>
    </ProductosProvider>
  );
}
