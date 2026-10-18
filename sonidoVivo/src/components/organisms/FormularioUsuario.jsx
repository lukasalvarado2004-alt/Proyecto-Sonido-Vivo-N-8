// src/components/organisms/FormularioUsuario.jsx
import React from 'react';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';

export default function FormularioUsuario(props) {
  const { 
    nombre, setNombre,
    correo, setCorreo,
    contrasena, setContrasena,
    confirmarContrasena, setConfirmarContrasena,
    rol, setRol,
    idEnEdicion,
    errores, setErrores,
    onGuardar,
    onCancelar 
  } = props;

  const rolesDisponibles = ['admin', 'cliente'];

  return (
    <div className="card p-4 shadow-sm border-0 bg-white">
      <h5 className="fw-bold border-bottom pb-2 mb-3">
        {idEnEdicion !== null ? 'Editar Usuario' : 'Nuevo Usuario'}
      </h5>
      
      <form onSubmit={onGuardar} noValidate>
        <CampoFormulario 
          id="usr-nombre" 
          etiqueta="Nombre Completo" 
          valor={nombre} 
          alCambiar={(v) => { setNombre(v); setErrores(p => ({ ...p, nombre: '' })); }} 
          error={errores.nombre} 
          placeholder="Juan Pérez" 
        />

        <CampoFormulario 
          id="usr-correo" 
          etiqueta="Correo Electrónico" 
          tipo="email"
          valor={correo} 
          alCambiar={(v) => { setCorreo(v); setErrores(p => ({ ...p, correo: '' })); }} 
          error={errores.correo} 
          placeholder="juan@ejemplo.com" 
        />

        <CampoFormulario 
          id="usr-rol" 
          etiqueta="Rol del Usuario" 
          tipo="select"
          valor={rol} 
          alCambiar={(v) => { setRol(v); setErrores(p => ({ ...p, rol: '' })); }} 
          error={errores.rol} 
          opciones={rolesDisponibles} 
        />

        <CampoFormulario 
          id="usr-contrasena" 
          etiqueta="Contraseña" 
          tipo="password"
          valor={contrasena} 
          alCambiar={(v) => { setContrasena(v); setErrores(p => ({ ...p, contrasena: '' })); }} 
          error={errores.contrasena} 
          placeholder="••••••••" 
        />

        <CampoFormulario 
          id="usr-confirmar" 
          etiqueta="Confirmar Contraseña" 
          tipo="password"
          valor={confirmarContrasena} 
          alCambiar={(v) => { setConfirmarContrasena(v); setErrores(p => ({ ...p, confirmarContrasena: '' })); }} 
          error={errores.confirmarContrasena} 
          placeholder="••••••••" 
        />

        <div className="d-grid gap-2 mt-4">
          <Boton 
            tipo="submit" 
            variante={idEnEdicion !== null ? 'warning' : 'purple'} 
            textoBoton={idEnEdicion !== null ? 'Guardar Cambios' : 'Crear Usuario'} 
            esBloque={true} 
          />
          {idEnEdicion !== null && (
            <Boton 
              tipo="button" 
              variante="secondary" 
              textoBoton="Cancelar Edición" 
              esBloque={true} 
              alHacerClic={onCancelar} 
            />
          )}
        </div>
      </form>
    </div>
  );
}