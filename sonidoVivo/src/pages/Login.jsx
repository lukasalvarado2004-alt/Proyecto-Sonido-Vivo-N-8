import { useState } from 'react';
import CampoFormulario from '../components/molecules/CampoFormulario';
import Boton from '../components/atoms/Boton';
import PlantillaPublica from "../components/templates/PlantillaPublica";
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function Login({ onLoginSuccess }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (correo.trim() === '' || contrasena.trim() === '') {
      alert('Por favor, ingresa tus datos para ingresar.');
      return;
    }
    onLoginSuccess(correo);

      // 1. Obtener la lista de usuarios del localStorage
  const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios')) || [];

  // 2. Buscar si coincide el correo Y la contraseña
  const usuarioValido = usuariosExistentes.find(
    (u) => u.correo === correo && u.contrasena === contrasena
  );

  if (!usuarioValido) {
    alert('Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.');
    return;
  }

  // 3. Si existe, loguear con éxito
  alert(`¡Bienvenido de vuelta, ${usuarioValido.nombre}!`);
  onLoginSuccess(correo)
  };

  useTituloPagina('Inicio Sesion')

  return (
     <PlantillaPublica>
    <div className="d-flex justify-content-center align-items-center py-5">
     
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
    </PlantillaPublica>
  );
}