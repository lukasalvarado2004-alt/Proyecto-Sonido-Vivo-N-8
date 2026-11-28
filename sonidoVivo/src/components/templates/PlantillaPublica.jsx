import React from "react";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";
import NotificacionStock from "../molecules/NotificacionStock";

import { useContenidoCarrito } from '../../context/ContenidoCarrito';

function PlantillaPublica({ children }) {
  const { totalProductos, mensajeErrorStock } = useContenidoCarrito();
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white position-relative">
      <Navbar totalProductos={totalProductos} />
      <NotificacionStock mensajeErrorStock={mensajeErrorStock} />

      <main className="flex-grow-1">
        {children}
      </main>
      <Footer correo="rgvalparaiso@sonidovivo.cl" />
    </div>
  );
}

export default PlantillaPublica;
