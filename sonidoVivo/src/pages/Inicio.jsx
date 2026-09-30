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
  <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
   <div className="card p-4 shadow-sm border-0 bg-white" style={{ width: '380px', borderRadius: '8px' }}>

    <div className="text-center mb-4">
     <h2 className="fw-bold mb-0" style={{ fontSize: '24px', color: '#212529' }}>
      Bienvenid@ a
     </h2>
     <h2 className="fw-bold" style={{ color: '#ff6b00', fontSize: '28px' }}>
      Sonido Vivo
     </h2>
     <small className="text-muted">Por favor ingresa tus datos para ingresar</small>
    </div>



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



   

    <div className="mb-4">

     <a href="#" style={{ color: '#ff6b00', fontSize: '13px', textDecoration: 'underline', fontWeight: '500' }}>

      ¿Olvidaste tu contraseña?

     </a>

    </div>



    

    <Boton alHacerClic={manejarEnvio} textoBoton="INICIAR SESIÓN" />

    

   </div>

  </div>

 );

}