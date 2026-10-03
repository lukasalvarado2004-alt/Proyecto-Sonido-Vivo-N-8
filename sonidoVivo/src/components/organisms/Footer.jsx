import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-5 pb-4 mt-auto border-top border-purple">
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">
          
          {/* Columna 1: Branding y Descripción */}
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-purple">
               SONIDO <div className="d-inline text-purple-brand">VIVO</div>
            </h5>
            <p className="text-secondary small">
              Tu tienda de música e instrumentos de confianza. Llevamos la mejor calidad de audio e instrumentos a la puerta de tu hogar.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 fw-bold text-light">Navegación</h6>
            <p className="mb-2">
              <a href="/inicio" className="text-secondary text-decoration-none hover-purple">Inicio</a>
            </p>
            <p className="mb-2">
              <a href="/catalogo" className="text-secondary text-decoration-none hover-purple">Catálogo</a>
            </p>
            <p className="mb-2">
              <a href="/contacto" className="text-secondary text-decoration-none hover-purple">Contacto</a>
            </p>
          </div>

          {/* Columna 3: Servicios / Ayuda */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 fw-bold text-light">Ayuda</h6>
            <p className="mb-2">
              <a href="#!" className="text-secondary text-decoration-none hover-purple">Envíos y Devoluciones</a>
            </p>
            <p className="mb-2">
              <a href="#!" className="text-secondary text-decoration-none hover-purple">Términos y Condiciones</a>
            </p>
          </div>

          {/* Columna 4: Contacto e Información */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 fw-bold text-light">Contacto</h6>
            <p className="text-secondary mb-2 small">Viña del Mar, Región de Valparaíso</p>
            <p className="text-secondary mb-2 small">rgvalparaiso@sonidovivo.cl</p>
            <p className="text-secondary mb-2 small">+56 9 1234 5678</p>
          </div>

        </div>

        <hr className="mb-4 mt-4 border-secondary" />

        {/* Sección inferior: Solo Redes Sociales centradas */}
        <div className="row justify-content-center pt-2">
          <div className="col-auto text-center">
            <a href="#!" className="text-secondary hover-purple text-decoration-none me-4 small fw-semibold">
              Instagram
            </a>
            <a href="#!" className="text-secondary hover-purple text-decoration-none me-4 small fw-semibold">
              Facebook
            </a>
            <a href="#!" className="text-secondary hover-purple text-decoration-none small fw-semibold">
              X
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;