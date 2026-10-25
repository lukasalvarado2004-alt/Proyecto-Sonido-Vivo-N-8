import React from "react";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";
import NotificacionStock from "../molecules/NotificacionStock";

function PlantillaPublica({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white position-relative">
      <Navbar />
      <NotificacionStock />

      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default PlantillaPublica;