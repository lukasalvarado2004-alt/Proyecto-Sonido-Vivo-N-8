// src/pages/Registro.jsx
import { useState } from 'react';
import CampoFormulario from '../components/molecules/CampoFormulario';
import Boton from '../components/atoms/Boton';
import Error from '../components/atoms/Error';

export default function Registro({ onRegistroExitoso, onIrALogin }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  const [errorGeneral, setErrorGeneral] = useState('');
  const [erroresCampos, setErroresCampos] = useState({});

  const manejarEnvio = (e) => {
    e.preventDefault();
    
    setErrorGeneral('');
    const nuevosErrores = {};

    // Validaciones
    if (!nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }

    if (!correo.trim()) {
      nuevosErrores.correo = 'El correo es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(correo)) {
      nuevosErrores.correo = 'Ingresa un correo electrónico válido';
    }

    if (!contrasena) {
      nuevosErrores.contrasena = 'La contraseña es obligatoria';
    } else if (contrasena.length < 7) {
      nuevosErrores.contrasena = 'La contraseña debe tener al menos 7 caracteres';
    }
    
    if (contrasena && confirmarContrasena && contrasena !== confirmarContrasena) {
      nuevosErrores.confirmarContrasena = 'Las contraseñas no coinciden';
    }

   
    if (Object.keys(nuevosErrores).length > 0) {
      setErroresCampos(nuevosErrores);
      setErrorGeneral('Por favor, corrige los campos destacados.');
      return;
    }

    
    setErroresCampos({});
    if (onRegistroExitoso) {
      onRegistroExitoso(correo);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div className="login-tarjeta">
        <div className="login-encabezado mb-4">
          <h2 className="login-titulo-principal">Crea tu cuenta en</h2>
          <h2 className="login-titulo-marca">
            SONIDO <div className="d-inline text-purple-brand">VIVO</div>
          </h2>
          <small className="login-subtitulo">Ingresa tus datos para registrarte</small>
        </div>

        {/* Átomo Error */}
        <Error mensaje={errorGeneral} variante="danger" />

        <form onSubmit={manejarEnvio} noValidate>
          <div className="login-formulario-campos">
            <CampoFormulario 
              valor={nombre} 
              alCambiar={(v) => { 
                setNombre(v); 
                setErroresCampos({...erroresCampos, nombre: ''}); 
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
                setErroresCampos({...erroresCampos, correo: ''}); 
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
                setErroresCampos({...erroresCampos, contrasena: ''}); 
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
                setErroresCampos({...erroresCampos, confirmarContrasena: ''}); 
                setErrorGeneral('');
              }} 
              tipo="password" 
              placeholder="Confirmar contraseña" 
              error={erroresCampos.confirmarContrasena}
            />
          </div>

          <div className="w-100 mt-2">
            <Boton 
              tipo="submit" 
              textoBoton="CREAR CUENTA" 
              variante="purple" 
            />
          </div>
        </form>

        <div className="login-contenedor-enlace mt-4">
          <span className="text-muted small">¿Ya tienes cuenta? </span>
          <a 
            href="#" 
            className="login-enlace-olvido fw-bold" 
            onClick={(e) => { 
              e.preventDefault(); 
              if (onIrALogin) onIrALogin(); 
            }}
          >
            Inicia sesión aquí
          </a>
        </div>
      </div>
    </div>
  );
}