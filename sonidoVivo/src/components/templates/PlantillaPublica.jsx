import React from "react";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

function PlantillaPublica(props) {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <Navbar 
        onIrAInicio={props.onIrAInicio} 
        onIrACatalogo={props.onIrACatalogo} 
        onIrAlCarrito={props.onIrAlCarrito} 
      />
      
      <main className="flex-grow-1">
        {props.children}
      </main>

      <Footer />
    </div>
  );
}

export default PlantillaPublica;
