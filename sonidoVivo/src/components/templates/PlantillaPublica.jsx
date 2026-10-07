// src/components/templates/PlantillaPublica.jsx
import React from 'react';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';

const PlantillaPublica = ({ children, onIrALogin, onIrACatalogo, onIrARegistro }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar 
        onIrALogin={onIrALogin} 
        onIrACatalogo={onIrACatalogo} 
        onIrARegistro={onIrARegistro} 
      />
      
      <main className="flex-grow-1">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default PlantillaPublica;