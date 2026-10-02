import { useState } from 'react';
import CampoFormulario from '../components/molecules/CampoFormulario';
import Boton from '../components/atoms/Boton';
import Footer from '../components/organisms/Footer';

export default function Inicio({ onLoginSuccess }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (correo.trim() === '' || contrasena.trim() === '') {
      alert('Por favor, ingresa tus datos para ingresar.');
      return;
    }
    onLoginSuccess(correo);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-custom-dark">
      
    
      <div className="flex-grow-1 d-flex justify-content-center align-items-center py-5">
        <div className="login-tarjeta">

          <div className="login-encabezado">
            <h2 className="login-titulo-principal">Bienvenid@ a</h2>
            <h2 className="login-titulo-marca">
              SONIDO <div className="d-inline text-purple-brand">VIVO</div>
            </h2>
            <small className="login-subtitulo">Por favor ingresa tus datos para ingresar</small>
          </div>

          
          <form onSubmit={manejarEnvio}>
            <div className="login-formulario-campos">
              <CampoFormulario 
                
                valor={correo} 
                alCambiar={setCorreo} 
                tipo="email" 
                placeholder="correo@electronico.cl" 
              />

              <CampoFormulario 
                 
                valor={contrasena} 
                alCambiar={setContrasena} 
                tipo="password" 
                placeholder="Contraseña" 
              />
            </div>

            <div className="login-contenedor-enlace">
              <a href="#" className="login-enlace-olvido">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <div className="w-100 mt-2">
              <Boton 
                tipo="submit" 
                textoBoton="INICIAR SESIÓN" 
                variante="purple" 
              />
            </div>
          </form>

        </div>
      </div>

    
      <Footer />

    </div>
  );
}