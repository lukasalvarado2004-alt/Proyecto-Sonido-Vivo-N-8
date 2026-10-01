import { useState } from 'react';
import CampoFormulario from '../components/molecules/CampoFormulario';
import Boton from '../components/atoms/Boton';

export default function Inicio({ onLoginSuccess }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const manejarEnvio = () => {
    if (correo.trim() === '' || contrasena.trim() === '') {
      alert('Por favor, ingresa tus datos para ingresar.');
      return;
    }
    onLoginSuccess(correo);
  };

  return (
    <div className="login-pantalla-completa">
      <div className="login-tarjeta">

        <div className="login-encabezado">
          <h2 className="login-titulo-principal">Bienvenid@ a</h2>
          <h2 className="login-titulo-marca">Sonido Vivo</h2>
          <small className="login-subtitulo">Por favor ingresa tus datos para ingresar</small>
        </div>

        <div className="login-formulario-campos">
          <CampoFormulario 
            icono="✉" 
            valor={correo} 
            alCambiar={setCorreo} 
            tipo="email" 
            placeholder="correo@electronico.cl" 
          />

          <CampoFormulario 
            icono="🔑" 
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
          <Boton alHacerClic={manejarEnvio} textoBoton="INICIAR SESIÓN" />
        </div>

      </div>
    </div>
  );
}
