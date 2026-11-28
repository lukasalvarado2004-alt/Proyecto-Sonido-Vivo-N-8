import React from "react";
import { useNavigate } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import Boton from "../components/atoms/Boton";
import { useTituloPagina } from "../hooks/useTituloPagina";

export default function NoEncontrada({ titulo }) {
  const navigate = useNavigate();
  useTituloPagina(titulo);

  return (
    <PlantillaPublica>
      <div className="container py-5 text-center text-white">
        <h2 className="h3 mb-3">Página no encontrada</h2>
        <p className="mb-4">No existe una página en esta dirección.</p>
        <Boton 
          textoBoton="Ir al catálogo" 
          alHacerClic={() => navigate('/catalogo')} 
          variante="warning" 
        />
      </div>
    </PlantillaPublica>
  );
}
