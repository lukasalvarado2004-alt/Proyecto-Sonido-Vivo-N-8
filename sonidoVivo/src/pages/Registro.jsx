// src/pages/Registro.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CampoFormulario from '../components/molecules/CampoFormulario';
import Boton from '../components/atoms/Boton';
import Error from '../components/atoms/Error';
import PlantillaPublica from "../components/templates/PlantillaPublica";

import { obtenerUsuarioPorCorreo, crearUsuario } from '../service/usuarioService';
import { 
  validarNombre, 
  validarCorreo, 
  validarContrasena, 
  validarConfirmarContrasena 
} from '../utils/validaciones.js';

export default function Registro({ onRegistroExitoso }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  const [errorGeneral, setErrorGeneral] = useState('');
  const [erroresCampos, setErroresCampos] = useState({});

  const navigate = useNavigate();

  const manejarEnvio = (e) => {
    e.preventDefault();
    setErrorGeneral('');

    const errorNombre = validarNombre(nombre);
    const errorCorreo = validarCorreo(correo);
    const errorClave = validarContrasena(contrasena);
    const errorConfirmar = validarConfirmarContrasena(contrasena, confirmarContrasena);

    const nuevosErrores = {};
    if (errorNombre) nuevosErrores.nombre = errorNombre;
    if (errorCorreo) nuevosErrores.correo = errorCorreo;
    if (errorClave) nuevosErrores.contrasena = errorClave;
    if (errorConfirmar) nuevosErrores.confirmarContrasena = errorConfirmar;

    if (Object.keys(nuevosErrores).length > 0) {
      setErroresCampos(nuevosErrores);
      setErrorGeneral('Por favor, corrige los campos destacados.');
      return;
    }

    
    if (obtenerUsuarioPorCorreo(correo)) {
      setErroresCampos({ correo: 'Este correo electrónico ya está registrado.' });
      setErrorGeneral('El correo ingresado ya se encuentra registrado.');
      return;
    }

   
    crearUsuario({
      nombre,
      correo,
      password: contrasena
    });

    if (onRegistroExitoso) {
      onRegistroExitoso(correo);
    }

    navigate('/login'); 
  };

  return (
    <PlantillaPublica>
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="login-tarjeta">
          <div className="login-encabezado mb-4 text-center">
            <h2 className="login-titulo-principal">Crea tu cuenta en</h2>
            <h2 className="login-titulo-marca">
              SONIDO <div className="d-inline text-purple-brand">VIVO</div>
            </h2>
            <small className="login-subtitulo">Ingresa tus datos para registrarte</small>
          </div>

          <Error mensaje={errorGeneral} variante="danger" />

          <form onSubmit={manejarEnvio} noValidate>
            <div className="login-formulario-campos">
              
              <CampoFormulario 
                valor={nombre} 
                alCambiar={(v) => { 
                  setNombre(v); 
                  setErroresCampos(prev => ({...prev, nombre: ''})); 
                  setErrorGeneral('');
                }} 
                tipo="text" 
                placeholder="Nombre completo" 
                error={erroresCampos.nombre}
              />

              <CampoFormulario 
                valor={correo} 
                alCambiar={(v) => { 
                  setCorreo(v); 
                  setErroresCampos(prev => ({...prev, correo: ''})); 
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
                  setErroresCampos(prev => ({...prev, contrasena: ''})); 
                  setErrorGeneral('');
                }} 
                tipo="password" 
                placeholder="Contraseña" 
                error={erroresCampos.contrasena}
              />

              <CampoFormulario 
                valor={confirmarContrasena} 
                alCambiar={(v) => { 
                  setConfirmarContrasena(v); 
                  setErroresCampos(prev => ({...prev, confirmarContrasena: ''})); 
                  setErrorGeneral('');
                }} 
                tipo="password" 
                placeholder="Confirmar contraseña" 
                error={erroresCampos.confirmarContrasena}
              />
            </div>

            <div className="w-100 mt-3">
              <Boton 
                tipo="submit" 
                textoBoton="CREAR CUENTA" 
                variante="purple" 
              />
            </div>
          </form>
        </div>
      </div>
    </PlantillaPublica>
  );
}