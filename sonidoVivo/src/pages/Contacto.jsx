import React from 'react';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import FormularioContacto from '../components/organisms/FormularioContacto';
import { useTituloPagina } from '../hooks/useTituloPagina';

export default function Contacto() {
  useTituloPagina('Contacto');

  return (
    <PlantillaPublica>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="text-center mb-4">
              <h1 className="display-6 fw-bold text-white mb-2">Contacto</h1>
              <p className="text-secondary lead fs-6">
                ¿Tienes alguna duda o necesitas asistencia con tu compra en <span className="text-purple-brand fw-bold">Sonido Vivo</span>? Completa el siguiente formulario y te responderemos a la brevedad.
              </p>
            </div>
            
            <FormularioContacto />
            
          </div>
        </div>
      </div>
    </PlantillaPublica>
  );
}