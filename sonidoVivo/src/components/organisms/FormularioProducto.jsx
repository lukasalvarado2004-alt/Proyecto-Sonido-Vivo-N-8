import React from 'react';
import CampoFormulario from '../molecules/CampoFormulario';
import CampoMensaje from '../molecules/CampoMensaje'; 
import Boton from '../atoms/Boton';
import ImagenProducto from '../atoms/ImagenProducto';

export default function FormularioProducto(props) {
  const {
    categoria, setCategoria,
    nombre, setNombre,
    stock, setStock,
    precio, setPrecio,
    descripcion, setDescripcion,
    imagen, setImagen,
    idEnEdicion,
    errores, setErrores,
    guardando, categoriasCatalogo,
    onGuardar,
    onCancelar
  } = props;

  return (
    <div className="card p-4 shadow-sm border-0 bg-white">
      <h5 className="fw-bold border-bottom pb-2 mb-3 text-dark">
        {idEnEdicion !== null ? 'Editar Producto' : 'Añadir Producto'}
      </h5>
      
      <form onSubmit={onGuardar} noValidate>

        <CampoFormulario 
          id="prod-categoria" 
          etiqueta="ID de categoría existente en la base de datos" 
          tipo="number" 
          valor={categoria} 
          alCambiar={(v) => { setCategoria(v); setErrores(p => ({ ...p, categoria: '' })); }} 
          error={errores.categoria} 
 
        />
        {categoriasCatalogo.length > 0 && <p className="small text-secondary">
          Categorías del catálogo: {categoriasCatalogo.map(([id, nombre]) => id + ' · ' + nombre).join(', ')}
        </p>}

        <CampoFormulario 
          id="prod-nombre" 
          etiqueta="Nombre del Producto" 
          valor={nombre} 
          alCambiar={(v) => { setNombre(v); setErrores(p => ({ ...p, nombre: '' })); }} 
          error={errores.nombre} 
          placeholder="Guitarra Acústica Folk" 
        />



        <CampoFormulario 
          id="prod-stock" 
          etiqueta="Stock" 
          tipo="number" 
          valor={stock} 
          alCambiar={(v) => { setStock(v); setErrores(p => ({ ...p, stock: '' })); }} 
          error={errores.stock} 
          placeholder="8" 
        />

        <CampoFormulario 
          id="prod-precio" 
          etiqueta="Precio" 
          tipo="number" 
          valor={precio} 
          alCambiar={(v) => { setPrecio(v); setErrores(p => ({ ...p, precio: '' })); }} 
          error={errores.precio} 
          placeholder="129990" 
        />

        
        <CampoMensaje
          id="prod-descripcion"
          etiqueta="Descripción"
          valor={descripcion}
          alCambiar={(v) => { setDescripcion(v); setErrores(p => ({ ...p, descripcion: '' })); }}
          error={errores.descripcion}
          placeholder="Detalles del producto..."
          filas={2}
          colorEtiqueta="text-dark" 
        />

      
        <div className="mb-3 text-start">
          <label className="form-label text-dark fw-bold small">Imagen del Producto</label>
          <input type="text" maxLength={255} value={imagen} onChange={e => setImagen(e.target.value)} className="form-control" placeholder="URL o nombre de imagen" />
          {errores.imagen && (
            <div className="invalid-feedback d-block text-danger small mt-1">
              {errores.imagen}
            </div>
          )}
          
          
          {imagen && (
            <div className="mt-2 text-center border p-2 rounded bg-light">
              <ImagenProducto 
                urlImagen={imagen} 
                altTexto="Vista previa" 
                className="img-fluid rounded imagen-preview" 
              />
            </div>
          )}
        </div>
        
        <div className="d-grid gap-2 mt-4">
          <Boton 
            tipo="submit"
            disabled={guardando} 
            variante={idEnEdicion !== null ? 'warning' : 'purple'} 
            textoBoton={idEnEdicion !== null ? 'Guardar Cambios' : 'Añadir Producto'} 
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
