// src/pages/Registro.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CampoFormulario from '../components/molecules/CampoFormulario';
import Boton from '../components/atoms/Boton';
import Error from '../components/atoms/Error';
import PlantillaPublica from "../components/templates/PlantillaPublica";

import { crearUsuario } from '../service/usuarioService';
import { obtenerMensajeError } from '../services/obtenerMensajeError';
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
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [enviando, setEnviando] = useState(false);

  const [errorGeneral, setErrorGeneral] = useState('');
  const [erroresCampos, setErroresCampos] = useState({});

  const navigate = useNavigate();

  const manejarEnvio = async (e) => {
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
    if (!/^\+?[0-9]{8,15}$/.test(telefono.trim())) nuevosErrores.telefono = 'Ingresa entre 8 y 15 dígitos (puedes comenzar con +).';
    if (direccion.trim().length < 2) nuevosErrores.direccion = 'Ingresa una dirección válida.';
    if (contrasena.length < 8) nuevosErrores.contrasena = 'La API exige al menos 8 caracteres.';

    if (Object.keys(nuevosErrores).length > 0) {
      setErroresCampos(nuevosErrores);
      setErrorGeneral('Por favor, corrige los campos destacados.');
      return;
    }

    
    setEnviando(true);
    try {
      await crearUsuario({ nombre, correo, contrasena, telefono, direccion });
    } catch (error) {
      setErrorGeneral(obtenerMensajeError(error));
      setEnviando(false);
      return; // conservar campos si no se guardó
    }
    setEnviando(false);

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
                valor={telefono} alCambiar={setTelefono} tipo="tel"
                placeholder="Teléfono (ej. +56912345678)" error={erroresCampos.telefono}
              />
              <CampoFormulario
                valor={direccion} alCambiar={setDireccion} tipo="text"
                placeholder="Dirección" error={erroresCampos.direccion}
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
                textoBoton={enviando ? "GUARDANDO..." : "CREAR CUENTA"}
                disabled={enviando} 
                variante="purple" 
              />
            </div>
          </form>
        </div>
      </div>
    </PlantillaPublica>
  );
}