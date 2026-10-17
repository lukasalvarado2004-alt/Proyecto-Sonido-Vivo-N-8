import { useState } from 'react';
import CampoFormulario from '../components/molecules/CampoFormulario';
import Boton from '../components/atoms/Boton';
import PlantillaPublica from "../components/templates/PlantillaPublica";
import { useTituloPagina } from '../hooks/useTituloPagina';



// 1. Importamos las funciones de la carpeta util
import { validarCorreo, validarContrasena } from '../utils/validaciones';


export default function Login({ onLoginSuccess }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  
  // Estado para capturar los mensajes de error de cada campo
  const [errores, setErrores] = useState({ correo: '', contrasena: '' });

  const manejarEnvio = (e) => {
    e.preventDefault();
    
    // 2. Ejecutamos las validaciones de la carpeta util
    const errorCorreo = validarCorreo(correo);
    const errorContrasena = validarContrasena(contrasena);

    // 3. Si hay algún error, lo guardamos en el estado y detenemos el envío
    if (errorCorreo || errorContrasena) {
      setErrores({
        correo: errorCorreo,
        contrasena: errorContrasena
      });
      return;
    }

    // 4. Si todo está correcto, limpiamos errores y procedemos
    setErrores({ correo: '', contrasena: '' });
    onLoginSuccess(correo);
  };

  useTituloPagina('Inicio Sesion');

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

          <form onSubmit={manejarEnvio} noValidate>
            <div className="login-formulario-campos">
              
              {/* 5. Pasamos el error correspondiente a cada campo */}
              <CampoFormulario 
                valor={correo} 
                alCambiar={(valor) => {
                  setCorreo(valor);
                  if (errores.correo) setErrores(prev => ({ ...prev, correo: '' })); // Limpia error al escribir
                }} 
                tipo="email" 
                placeholder="correo@electronico.cl" 
                error={errores.correo} 
              />

              <CampoFormulario 
                valor={contrasena} 
                alCambiar={(valor) => {
                  setContrasena(valor);
                  if (errores.contrasena) setErrores(prev => ({ ...prev, contrasena: '' })); // Limpia error al escribir
                }} 
                tipo="password" 
                placeholder="Contraseña" 
                error={errores.contrasena} 
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
