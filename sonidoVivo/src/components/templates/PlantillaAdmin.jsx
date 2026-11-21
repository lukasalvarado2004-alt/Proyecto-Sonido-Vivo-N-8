// src/components/templates/PlantillaAdmin.jsx
import React from "react";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

function PlantillaAdmin({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <Navbar />
      <main className="flex-grow-1 container-fluid px-4 py-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default PlantillaAdmin;