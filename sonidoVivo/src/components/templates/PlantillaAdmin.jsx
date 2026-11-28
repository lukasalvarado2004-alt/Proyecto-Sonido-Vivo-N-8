// src/components/templates/PlantillaAdmin.jsx
import React from "react";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

import { useContenidoCarrito } from '../../context/ContenidoCarrito';

function PlantillaAdmin({ children }) {
  const { totalProductos } = useContenidoCarrito();
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <Navbar totalProductos={totalProductos} />
      <main className="flex-grow-1 container-fluid px-4 py-4">
        {children}
      </main>
      <Footer correo="rgvalparaiso@sonidovivo.cl" />
    </div>
  );
}

export default PlantillaAdmin;
