import React from 'react';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';

const PlantillaPublica = ({ children }) => {
  return (
    // Agregamos clases de Bootstrap para que el footer siempre quede pegado abajo
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      {/* Contenido principal que crecerá para empujar el footer */}
      <main className="flex-grow-1">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default PlantillaPublica;