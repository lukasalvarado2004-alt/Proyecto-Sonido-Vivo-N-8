import React, { useState } from 'react';
import CampoFormulario from '../molecules/CampoFormulario';
import CampoMensaje from '../molecules/CampoMensaje'; 
import Boton from '../atoms/Boton';

export default function FormularioContacto() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const manejarEnvio = (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    if (!nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio.';
    if (!correo.trim()) nuevosErrores.correo = 'El correo es obligatorio.';
    else if (!/\S+@\S+\.\S+/.test(correo)) nuevosErrores.correo = 'El correo electrónico no es válido.';
    if (!asunto.trim()) nuevosErrores.asunto = 'El asunto es obligatorio.';
    if (!mensaje.trim()) nuevosErrores.mensaje = 'El mensaje es obligatorio.';

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      
      setEnviado(true);
      setNombre('');
      setCorreo('');
      setAsunto('');
      setMensaje('');
      setErrores({});
      
      setTimeout(() => setEnviado(false), 5000);
    }
  };

  return (
    <div className="card p-4 shadow-lg border-secondary bg-dark text-white rounded-3">
      <h2 className="h4 fw-bold mb-4 text-warning">Envíanos un mensaje</h2>

      {enviado && (
        <div className="alert alert-success py-2 px-3 small text-center mb-3 fw-bold" role="alert">
          ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
        </div>
      )}

      <form onSubmit={manejarEnvio} noValidate>
        <CampoFormulario
          id="contacto-nombre"
          etiqueta="Nombre Completo"
          valor={nombre}
          alCambiar={(v) => { setNombre(v); setErrores(p => ({ ...p, nombre: '' })); }}
          error={errores.nombre}
          placeholder="Ej: Juan Pérez"
        />

        <CampoFormulario
          id="contacto-correo"
          etiqueta="Correo Electrónico"
          tipo="email"
          valor={correo}
          alCambiar={(v) => { setCorreo(v); setErrores(p => ({ ...p, correo: '' })); }}
          error={errores.correo}
          placeholder="juan@ejemplo.com"
        />

        <CampoFormulario
          id="contacto-asunto"
          etiqueta="Asunto"
          valor={asunto}
          alCambiar={(v) => { setAsunto(v); setErrores(p => ({ ...p, asunto: '' })); }}
          error={errores.asunto}
          placeholder="Consulta sobre disponibilidad, envíos, etc."
        />

    
        <CampoMensaje
          id="contacto-mensaje"
          etiqueta="Mensaje"
          valor={mensaje}
          alCambiar={(v) => { setMensaje(v); setErrores(p => ({ ...p, mensaje: '' })); }}
          error={errores.mensaje}
          placeholder="Escribe el detalle de tu consulta aquí..."
          filas={5}
        />

        <div className="d-grid gap-2 mt-4">
          <Boton
            tipo="submit"
            variante="warning"
            textoBoton="Enviar Mensaje"
            esBloque={true}
          />
        </div>
      </form>
    </div>
  );
}