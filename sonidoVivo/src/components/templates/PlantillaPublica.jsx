import React from 'react';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';

const PlantillaPublica = ({ children, onIrAInicio, onIrACatalogo }) => {
  return (
    // Estructura flex para que el Footer siempre quede abajo del todo
    <div className="d-flex flex-column min-vh-100">
      {/* Cabecera común */}
      <Navbar onIrAInicio={onIrAInicio} onIrACatalogo={onIrACatalogo} />
      
      {/* Contenido dinámico (Páginas o vistas) */}
      <main className="flex-grow-1">
        {children}
      </main>

      {/* Pie de página común */}
      <Footer />
    </div>
  );
};

export default PlantillaPublica;