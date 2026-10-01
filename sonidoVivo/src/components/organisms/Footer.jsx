import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row align-items-center gy-3 text-center text-md-start">
          
          {/* Nombre / Marca */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold mb-1">SonidoVivo</h5>
            <small className="text-secondary">Lo mejor en audio profesional</small>
          </div>

          {/* Enlaces de navegación */}
          <div className="col-12 col-md-4 text-center">
            <ul className="list-inline mb-0">
              <li className="list-inline-item mx-2">
                <a href="#inicio" className="text-white text-decoration-none">Inicio</a>
              </li>
              <li className="list-inline-item mx-2">
                <a href="#catalogo" className="text-white text-decoration-none">Catálogo</a>
              </li>
              <li className="list-inline-item mx-2">
                <a href="#contacto" className="text-white text-decoration-none">Contacto</a>
              </li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="col-12 col-md-4 text-center text-md-end">
            <small className="text-secondary">
              &copy; {new Date().getFullYear()} SonidoVivo. Todos los derechos reservados.
            </small>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;