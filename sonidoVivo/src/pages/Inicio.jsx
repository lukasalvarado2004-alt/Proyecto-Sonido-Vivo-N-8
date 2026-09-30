import { useState } from 'react';
import CampoTexto from '../components/atoms/CampoTexto'; 
import Boton from '../components/atoms/Boton';

export default function Inicio({ onLoginSuccess }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const manejarEnvio = () => {
    if (correo.trim() === '' || contrasena.trim() === '') {
      alert('Por favor, completa ambos campos.');
      return;
    }
    onLoginSuccess(correo);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2>Iniciar Sesión</h2>
      
      {/* PRIMER USO: Para el correo */}
      <div className="mb-3">
        <label>Correo Electrónico:</label>
        <CampoTexto 
          valor={correo} 
          alCambiar={setCorreo} 
          tipo="email" 
          placeholder="correo@electronico.cl" 
        />
      </div>
      
      {/* SEGUNDO USO: Para la contraseña */}
      <div className="mb-3">
        <label>Contraseña:</label>
        <CampoTexto 
          valor={contrasena} 
          alCambiar={setContrasena} 
          tipo="password" 
          placeholder="Contraseña" 
        />
      </div>
      
      <Boton alHacerClic={manejarEnvio} textoBoton="INICIAR SESIÓN" />
    </div>
  );
}