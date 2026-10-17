// src/pages/AdminProductos.jsx
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import CampoFormulario from '../components/molecules/CampoFormulario'
import Boton from '../components/atoms/Boton'
import { useProductos } from '../context/ProductosContext'
import { validarNombre, validarNumero, validarCodigo, validarCategoria } from '../utils/validaciones'
import { useTituloPagina } from '../hooks/useTituloPagina'

import '../App.css' 

export default function AdminProductos() {
  const productosCtx = useProductos()
  
  // Estados para capturar los valores del formulario
  const [codigo, setCodigo] = useState('')
  const [categoria, setCategoria] = useState('')
  const [nombre, setNombre] = useState('')
  const [marca, setMarca] = useState('')
  const [modelo, setModelo] = useState('')
  const [stock, setStock] = useState('')
  const [precio, setPrecio] = useState('')
  const [descripcion, setDescripcion] = useState('')
  
  // Estado para rastrear si estamos editando un producto existente o creando uno nuevo
  const [idEnEdicion, setIdEnEdicion] = useState(null)
  const [imagenActual, setImagenActual] = useState('')
  
  const [errores, setErrores] = useState({})
  useTituloPagina('Administrar productos')

  // Obtener categorías únicas dinámicamente desde el estado global
  const sortedCategories = [
    ...new Set(productosCtx.productos.map((p) => p.categoria).filter(Boolean))
  ].sort();

  // Carga los datos de un artículo en el formulario lateral
  function activarEdicion(producto) {
  // Usa el id si existe, de lo contrario usa el codigo
  setIdEnEdicion(producto.id ?? producto.codigo)
  setCodigo(producto.codigo || '')
  setCategoria(producto.categoria || '')
  setNombre(producto.nombre || '')
  setMarca(producto.marca || '')
  setModelo(producto.modelo || '')
  setStock(String(producto.stock ?? ''))
  setPrecio(String(producto.precio ?? ''))
  setDescripcion(producto.descripcion || '')
  setImagenActual(producto.imagen || '')
  setErrores({})
}

  // Cancela la edición y devuelve el formulario a su estado base vacío
  function cancelarEdicion() {
    setIdEnEdicion(null)
    setCodigo('')
    setCategoria('')
    setNombre('')
    setMarca('')
    setModelo('')
    setStock('')
    setPrecio('')
    setDescripcion('')
    setImagenActual('')
    setErrores({})
  }

  function gestionarEnvio(evento) {
    evento.preventDefault()
    
    // Validamos usando las utilidades centralizadas
    const nuevosErrores = {
      codigo: validarCodigo(codigo),
      categoria: validarCategoria(categoria),
      nombre: validarNombre(nombre),
      stock: validarNumero(stock, 'El stock', 0),
      precio: validarNumero(precio, 'El precio', 1),
    }
    
    setErrores(nuevosErrores)
    
    // Si pasa todas las validaciones (ningún error tiene texto)
    if (!nuevosErrores.codigo && !nuevosErrores.categoria && !nuevosErrores.nombre && !nuevosErrores.stock && !nuevosErrores.precio) {
      const payload = {
        codigo: codigo.trim().toUpperCase(),
        categoria: categoria.trim(),
        nombre: nombre.trim(), 
        marca: marca.trim(),
        modelo: modelo.trim(),
        stock: Number(stock),
        precio: Number(precio), 
        descripcion: descripcion.trim(),
        imagen: idEnEdicion !== null ? imagenActual : "https://unsplash.com"
      }

      if (idEnEdicion !== null) {
        // Ejecuta la mutación de actualización si hay un ID activo
        productosCtx.actualizar(idEnEdicion, payload)
      } else {
        // Ejecuta la creación si el ID es nulo
        productosCtx.crear(payload)
      }
      
      cancelarEdicion()
    }
  }

  return (
    <PlantillaPublica>
      <div className="bg-light p-4 text-dark admin-min-altura admin-espacio-inferior">
        
        <div className="bg-dark text-white p-3 mb-4 rounded shadow-sm">
          <h2 className="fw-bold h4 mb-0">Panel de Administración de Inventario</h2>
        </div>

        <div className="row g-4">
          
          {/* Formulario lateral */}
          <div className="col-md-4 admin-formulario-zona">
            <div className="card p-3 shadow-sm border-0 bg-white text-dark">
              <h4 className="h5 fw-bold border-bottom pb-2 mb-3 text-dark">
                {idEnEdicion !== null ? 'Modificar Producto' : 'Añadir Producto'}
              </h4>
              
              <form onSubmit={gestionarEnvio} noValidate className="admin-scroll-formulario">
                <div className="mb-3">
                  <label className="form-label fw-bold small text-secondary">Código</label>
                  <CampoFormulario id="admin-codigo" valor={codigo} alCambiar={setCodigo} error={errores.codigo} placeholder="GA001" />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small text-secondary">Categoría</label>
                  <CampoFormulario 
                    id="admin-categoria" 
                    tipo="select" 
                    valor={categoria} 
                    alCambiar={setCategoria} 
                    error={errores.categoria} 
                    opciones={sortedCategories} 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small text-secondary">Nombre del Producto</label>
                  <CampoFormulario id="admin-nombre" valor={nombre} alCambiar={setNombre} error={errores.nombre} placeholder="Guitarra Acústica Folk" />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small text-secondary">Marca</label>
                  <CampoFormulario id="admin-marca" valor={marca} alCambiar={setMarca} placeholder="Yamaha" />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small text-secondary">Modelo</label>
                  <CampoFormulario id="admin-modelo" valor={modelo} alCambiar={setModelo} placeholder="F310" />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small text-secondary">Stock</label>
                  <CampoFormulario id="admin-stock" tipo="number" valor={stock} alCambiar={setStock} error={errores.stock} placeholder="8" />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small text-secondary">Precio</label>
                  <CampoFormulario id="admin-precio" tipo="number" valor={precio} alCambiar={setPrecio} error={errores.precio} placeholder="129990" />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold small text-secondary">Descripción</label>
                  <textarea 
                    className="form-control bg-white text-dark border-secondary-subtle admin-descripcion-grande" 
                    value={descripcion} 
                    onChange={(e) => setDescripcion(e.target.value)} 
                    placeholder="Detalles del artículo, maderas, conectividad, etc..."
                  />
                </div>

                <div className="d-grid gap-2 mt-4">
                  <Boton tipo="submit" variante={idEnEdicion !== null ? 'warning' : 'purple'} textoBoton={idEnEdicion !== null ? 'Actualizar Producto' : 'Guardar Producto'} esBloque={true} />
                  {idEnEdicion !== null && (
                    <Boton tipo="button" variante="secondary" textoBoton="Cancelar Edición" esBloque={true} alHacerClic={cancelarEdicion} />
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Tabla de registros */}
          <div className="col-md-8">
            <div className="card p-3 shadow-sm border-0 bg-white text-dark">
              <h4 className="h5 fw-bold border-bottom pb-2 mb-3 text-secondary">Inventario Registrado</h4>
              
              <Table striped bordered hover responsive className="align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>Código</th>
                    <th>Categoría</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th className="text-end" style={{ width: '160px' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productosCtx.productos.map((p, idx) => (
                    <tr key={p.id ? `prod-${p.id}` : `idx-${idx}`}>
                      <td className="small fw-bold text-muted">{p.codigo || 'S/C'}</td>
                      <td className="small text-secondary">{p.categoria || 'Sin Categoría'}</td> 
                      <td><span className="fw-semibold text-dark">{p.nombre}</span></td>
                      <td className="text-success fw-bold">
                        {p.precio ? `$${Number(p.precio).toLocaleString('es-CL')}` : '\$0'}
                      </td>
                      <td className="text-end">
                        <span className="me-2">
                          <Boton variante="warning" textoBoton="Editar" alHacerClic={() => activarEdicion(p)} />
                        </span>
                        <Boton variante="danger" textoBoton="Eliminar" alHacerClic={() => productosCtx.eliminar(p.id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>

        </div>

      </div>
    </PlantillaPublica>
  )
}
