import React from 'react';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';

export default function FormularioCategoria(props) {
  const {
    nombreCategoria,
    setNombreCategoria,
    categoriaEnEdicion,
    errorCategoria,
    setErrorCategoria,
    onGuardar,
    onCancelar
  } = props;

  return (
    <div className="card p-4 shadow-sm border-0 bg-white">
      <h5 className="fw-bold border-bottom pb-2 mb-3">
        {categoriaEnEdicion !== null ? 'Editar Categoría' : 'Nueva Categoría'}
      </h5>
      
      <form onSubmit={onGuardar} noValidate>
        <CampoFormulario
          id="cat-nombre"
          etiqueta="Nombre de la Categoría"
          valor={nombreCategoria}
          alCambiar={(v) => {
            setNombreCategoria(v);
            if (setErrorCategoria) setErrorCategoria('');
          }}
          error={errorCategoria}
          placeholder="Ej: Guitarras Acústicas"
        />

        <div className="d-grid gap-2 mt-4">
          <Boton
            tipo="submit"
            variante={categoriaEnEdicion !== null ? 'warning' : 'purple'}
            textoBoton={categoriaEnEdicion !== null ? 'Guardar Cambios' : 'Crear Categoría'}
            esBloque={true}
          />
          {categoriaEnEdicion !== null && (
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