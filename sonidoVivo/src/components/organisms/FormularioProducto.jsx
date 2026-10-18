// src/components/organisms/FormularioProducto.jsx
import React from 'react';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';

export default function FormularioProducto(props) {
  const {
    codigo, setCodigo,
    categoria, setCategoria,
    nombre, setNombre,
    marca, setMarca,
    modelo, setModelo,
    stock, setStock,
    precio, setPrecio,
    descripcion, setDescripcion,
    imagen, setImagen,
    idEnEdicion,
    errores, setErrores,
    categoriasDisponibles,
    onGuardar,
    onCancelar,
    onCargarArchivo
  } = props;

  return (
    <div className="card p-4 shadow-sm border-0 bg-white">
      <h5 className="fw-bold border-bottom pb-2 mb-3">
        {idEnEdicion !== null ? 'Editar Producto' : 'Añadir Producto'}
      </h5>
      
      <form onSubmit={onGuardar} noValidate>
        <CampoFormulario 
          id="prod-codigo" 
          etiqueta="Código" 
          valor={codigo} 
          alCambiar={(v) => { setCodigo(v); setErrores(p => ({ ...p, codigo: '' })); }} 
          error={errores.codigo} 
          placeholder="GA001" 
        />

        <CampoFormulario 
          id="prod-categoria" 
          etiqueta="Categoría" 
          tipo="select" 
          valor={categoria} 
          alCambiar={(v) => { setCategoria(v); setErrores(p => ({ ...p, categoria: '' })); }} 
          error={errores.categoria} 
          opciones={categoriasDisponibles} 
        />

        <CampoFormulario 
          id="prod-nombre" 
          etiqueta="Nombre del Producto" 
          valor={nombre} 
          alCambiar={(v) => { setNombre(v); setErrores(p => ({ ...p, nombre: '' })); }} 
          error={errores.nombre} 
          placeholder="Guitarra Acústica Folk" 
        />

        <CampoFormulario 
          id="prod-marca" 
          etiqueta="Marca" 
          valor={marca} 
          alCambiar={(v) => { setMarca(v); setErrores(p => ({ ...p, marca: '' })); }} 
          error={errores.marca} 
          placeholder="Yamaha" 
        />

        <CampoFormulario 
          id="prod-modelo" 
          etiqueta="Modelo" 
          valor={modelo} 
          alCambiar={(v) => { setModelo(v); setErrores(p => ({ ...p, modelo: '' })); }} 
          error={errores.modelo} 
          placeholder="F310" 
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

        <div className="mb-3 text-start">
          <label className="form-label text-dark fw-bold small">Descripción</label>
          <textarea 
            className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
            rows="2"
            value={descripcion}
            onChange={(e) => { setDescripcion(e.target.value); setErrores(p => ({ ...p, descripcion: '' })); }}
            placeholder="Detalles del producto..."
          ></textarea>
          {errores.descripcion && <div className="invalid-feedback d-block text-danger small mt-1">{errores.descripcion}</div>}
        </div>

        <div className="mb-3 text-start">
          <label className="form-label text-dark fw-bold small">Imagen del Producto</label>
          <input type="file" accept="image/*" className="form-control mb-2" onChange={onCargarArchivo} />
          <CampoFormulario 
            id="prod-imagen" 
            valor={imagen} 
            alCambiar={(v) => { setImagen(v); setErrores(p => ({ ...p, imagen: '' })); }} 
            error={errores.imagen} 
            placeholder="O pega una URL: https://..." 
          />
          
          {imagen && (
            <div className="mt-2 text-center border p-2 rounded bg-light">
              <img src={imagen} alt="Vista previa" style={{ maxHeight: '100px', objectFit: 'contain' }} className="img-fluid rounded" />
            </div>
          )}
        </div>
        
        <div className="d-grid gap-2 mt-4">
          <Boton tipo="submit" variante={idEnEdicion !== null ? 'warning' : 'purple'} textoBoton={idEnEdicion !== null ? 'Guardar Cambios' : 'Añadir Producto'} esBloque={true} />
          {idEnEdicion !== null && <Boton tipo="button" variante="secondary" textoBoton="Cancelar Edición" esBloque={true} alHacerClic={onCancelar} />}
        </div>
      </form>
    </div>
  );
}