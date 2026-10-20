// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import CampoFormulario from '../components/molecules/CampoFormulario';
import Boton from '../components/atoms/Boton';
import Error from '../components/atoms/Error';
import PlantillaPublica from '../components/templates/PlantillaPublica';

import { autenticarUsuario } from '../service/usuarioService';
import { validarCorreo, validarContrasena } from '../utils/validaciones.js';

export default function Login({ onLoginExitoso }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const [errorGeneral, setErrorGeneral] = useState('');
  const [erroresCampos, setErroresCampos] = useState({});

  const navigate = useNavigate();

  const manejarEnvio = (e) => {
    e.preventDefault();
    setErrorGeneral('');
    setErroresCampos({});

    // 1. Validar formato básico de inputs
    const errorCorreo = validarCorreo(correo);
    const errorClave = validarContrasena(contrasena);

    if (errorCorreo || errorClave) {
      setErroresCampos({
        correo: errorCorreo,
        contrasena: errorClave
      });
      return;
    }

    // 2. Intentar autenticación
    const resultado = autenticarUsuario(correo, contrasena);

    // Verificación defensiva contra null/undefined (Evita TypeError)
    if (!resultado || !resultado.exito) {
      setErrorGeneral(resultado?.error || 'Correo o contraseña incorrectos. Por favor reintenta.');
      setErroresCampos({});
      return;
    }

    // 3. Inicio de sesión exitoso (Guardar en ambas claves para compatibilidad)
    localStorage.setItem('sv_sesion', JSON.stringify(resultado.usuario));
    localStorage.setItem('usuarioSesion', JSON.stringify(resultado.usuario));

    if (onLoginExitoso) {
      onLoginExitoso(resultado.usuario);
    }

    // Normalizar el rol para aceptar tanto 'admin' como 'Administrador'
    const rolNormalizado = (resultado.usuario?.rol || '').toLowerCase();
    const esAdmin = rolNormalizado === 'admin' || rolNormalizado === 'administrador';

    if (esAdmin) {
      navigate('/admin');
    } else {
      navigate('/catalogo');
    }
  };

  return (
    <PlantillaPublica>
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="login-tarjeta">
          <div className="login-encabezado mb-4 text-center">
            <h2 className="login-titulo-principal">Inicia Sesión en</h2>
            <h2 className="login-titulo-marca">
              SONIDO <div className="d-inline text-purple-brand">VIVO</div>
            </h2>
            <small className="login-subtitulo">Ingresa tus credenciales para continuar</small>
          </div>

          {/* ÚNICO MENSAJE DE ERROR SUPERIOR */}
          <Error mensaje={errorGeneral} variante="danger" />

          <form onSubmit={manejarEnvio} noValidate>
            <div className="login-formulario-campos">
              
              <CampoFormulario 
                valor={correo} 
                alCambiar={(v) => { 
                  setCorreo(v); 
                  setErroresCampos(prev => ({ ...prev, correo: '' })); 
                  setErrorGeneral('');
                }} 
                tipo="email" 
                placeholder="correo@electronico.cl" 
                error={erroresCampos.correo}
              />

              <CampoFormulario 
                valor={contrasena} 
                alCambiar={(v) => { 
                  setContrasena(v); 
                  setErroresCampos(prev => ({ ...prev, contrasena: '' })); 
                  setErrorGeneral('');
                }} 
                tipo="password" 
                placeholder="Contraseña" 
                error={erroresCampos.contrasena}
              />

            </div>

            <div className="w-100 mt-3">
              <Boton 
                tipo="submit" 
                textoBoton="INICIAR SESIÓN" 
                variante="purple" 
              />
            </div>
          </form>

          <div className="text-center mt-4">
            <small className="text-light">
              ¿No tienes cuenta?{' '}
              <Link to="/registro" className="text-purple-brand text-decoration-none fw-bold">
                Regístrate aquí
              </Link>
            </small>
          </div>

        </div>
      </div>
    </PlantillaPublica>
  );
}