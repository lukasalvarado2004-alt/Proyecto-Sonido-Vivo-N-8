
// src/pages/AdminProductos.jsx
import React, { useState } from 'react';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useProductos } from '../context/ProductosContext';
import Error from '../components/atoms/Error';

import FormularioProducto from '../components/organisms/FormularioProducto';
import TablaProductos from '../components/organisms/TablaProductos';
import FormularioUsuario from '../components/organisms/FormularioUsuario';
import TablaUsuarios from '../components/organisms/TablaUsuario';
import TablaCriticos from '../components/organisms/TablaCriticos';
import FormularioCategoria from '../components/organisms/FormularioCategoria';
import TablaCategoria from '../components/organisms/TablaCategoria';

// Importación de la molécula ResumenPedido
import { ResumenPedido } from '../components/molecules/ResumenPedido';

import * as usuarioService from '../service/usuarioService.js';
import * as categoriaService from '../service/categoriaService.js';

// Importación del archivo JSON de compras desde la carpeta data
import comprasData from '../data/CompraData.json';

import { 
  validarCodigo, 
  validarCategoria, 
  validarNombre, 
  validarMarca, 
  validarModelo, 
  validarNumero, 
  validarStock,
  validarDescripcion, 
  validarImagen,
  validarCorreo,
  validarContrasena,
  validarConfirmarContrasena,
  validarRol,
  validarNombreCategoria
} from '../utils/validaciones.js';

export default function AdminProductos() {
  const { productos, crear, actualizar, eliminar } = useProductos();

  const [umbralStock] = useState(5);
  const [errorGeneral, setErrorGeneral] = useState('');

  // --- ESTADO PARA EL MÓDULO DE ÍTEMS CRÍTICOS ---
  const [umbralCritico, setUmbralCritico] = useState(5);

  // --- ESTADOS CRUD CATEGORÍAS ---
  const [categorias, setCategorias] = useState(() => categoriaService.listarCategorias());
  const [catNombre, setCatNombre] = useState('');
  const [catEnEdicion, setCatEnEdicion] = useState(null);
  const [catError, setCatError] = useState('');

  // --- ESTADOS CRUD PRODUCTOS ---
  const [idEnEdicion, setIdEnEdicion] = useState(null);
  const [errores, setErrores] = useState({});
  const [codigo, setCodigo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [stock, setStock] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');

  // --- ESTADOS CRUD USUARIOS ---
  const [usuarios, setUsuarios] = useState(() => usuarioService.listarUsuarios());
  const [usrIdEnEdicion, setUsrIdEnEdicion] = useState(null);
  const [usrErrores, setUsrErrores] = useState({});
  const [usrNombre, setUsrNombre] = useState('');
  const [usrCorreo, setUsrCorreo] = useState('');
  const [usrRol, setUsrRol] = useState('cliente');
  const [usrContrasena, setUsrContrasena] = useState('');
  const [usrConfirmarContrasena, setUsrConfirmarContrasena] = useState('');

  // --- ESTADO PARA EL MÓDULO DE PEDIDOS / SOLICITUDES (Cargado desde el JSON) ---
  const [compras, setCompras] = useState(comprasData);

  // --- HANDLERS CATEGORÍAS ---
  function activarEdicionCategoria(cat) {
    setErrorGeneral('');
    setCatEnEdicion(cat);
    setCatNombre(cat);
    setCatError('');
  }

  function cancelarEdicionCategoria() {
    setErrorGeneral('');
    setCatEnEdicion(null);
    setCatNombre('');
    setCatError('');
  }

  function guardarCategoria(e) {
    e.preventDefault();
    setErrorGeneral('');

    const err = validarNombreCategoria(catNombre, categorias, catEnEdicion);
    if (err) {
      setCatError(err);
      return;
    }

    if (catEnEdicion !== null) {
      categoriaService.actualizarCategoria(catEnEdicion, catNombre.trim());
    } else {
      categoriaService.crearCategoria(catNombre.trim());
    }

    setCategorias(categoriaService.listarCategorias());
    cancelarEdicionCategoria();
  }

  function eliminarCategoriaHandler(cat) {
    if (window.confirm(`¿Seguro que deseas eliminar la categoría "${cat}"?`)) {
      setErrorGeneral('');
      categoriaService.eliminarCategoria(cat);
      setCategorias(categoriaService.listarCategorias());
      if (catEnEdicion === cat) {
        cancelarEdicionCategoria();
      }
    }
  }

  // --- HANDLERS PRODUCTOS ---
  function activarEdicion(p) {
    setErrorGeneral('');
    setIdEnEdicion(p.id ?? p.codigo);
    setCodigo(p.codigo || '');
    setCategoria(p.categoria || '');
    setNombre(p.nombre || '');
    setMarca(p.marca || '');
    setModelo(p.modelo || '');
    setStock(String(p.stock ?? ''));
    setPrecio(String(p.precio ?? ''));
    setDescripcion(p.descripcion || '');
    setImagen(p.imagen || '');
    setErrores({});
  }

  function cancelarEdicion() {
    setErrorGeneral('');
    setIdEnEdicion(null);
    setCodigo(''); setCategoria(''); setNombre(''); setMarca('');
    setModelo(''); setStock(''); setPrecio(''); setDescripcion(''); setImagen('');
    setErrores({});
  }

  function manejarCargaArchivoImagen(e) {
    const archivo = e.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onloadend = () => {
        setImagen(lector.result);
        setErrores(prev => ({ ...prev, imagen: '' }));
      };
      lector.readAsDataURL(archivo);
    }
  }

  function guardarProducto(e) {
    e.preventDefault();
    setErrorGeneral('');

    const nuevosErrores = {
      codigo: validarCodigo(codigo),
      categoria: validarCategoria(categoria),
      nombre: validarNombre(nombre),
      marca: validarMarca(marca),
      modelo: validarModelo(modelo),
      stock: validarStock(stock),
      precio: validarNumero(precio, 'El precio', 1),
      descripcion: validarDescripcion(descripcion),
      imagen: validarImagen(imagen)
    };

    setErrores(nuevosErrores);

    if (Object.values(nuevosErrores).some(msg => msg !== '')) {
      setErrorGeneral('Por favor, corrige los campos destacados en el formulario de productos.');
      return;
    }

    const payload = {
      codigo: codigo.trim().toUpperCase(),
      categoria: categoria.trim(),
      nombre: nombre.trim(),
      marca: marca.trim(),
      modelo: modelo.trim(),
      stock: Number(stock),
      precio: Number(precio),
      descripcion: descripcion.trim(),
      imagen: imagen.trim()
    };

    if (idEnEdicion !== null) {
      actualizar(idEnEdicion, payload);
    } else {
      crear(payload);
    }

    cancelarEdicion();
  }

  // --- HANDLERS USUARIOS ---
  function activarEdicionUsuario(u) {
    setErrorGeneral('');
    setUsrIdEnEdicion(u.id);
    setUsrNombre(u.nombre || '');
    setUsrCorreo(u.correo || '');
    setUsrRol(u.rol || 'cliente');
    setUsrContrasena(u.contrasena || '');
    setUsrConfirmarContrasena(u.contrasena || '');
    setUsrErrores({});
  }

  function cancelarEdicionUsuario() {
    setErrorGeneral('');
    setUsrIdEnEdicion(null);
    setUsrNombre('');
    setUsrCorreo('');
    setUsrRol('cliente');
    setUsrContrasena('');
    setUsrConfirmarContrasena('');
    setUsrErrores({});
  }

  function guardarUsuario(e) {
    e.preventDefault();
    setErrorGeneral('');

    const nuevosErrores = {
      nombre: validarNombre(usrNombre),
      correo: validarCorreo(usrCorreo),
      rol: validarRol(usrRol),
      contrasena: validarContrasena(usrContrasena),
      confirmarContrasena: validarConfirmarContrasena(usrContrasena, usrConfirmarContrasena)
    };

    setUsrErrores(nuevosErrores);

    if (Object.values(nuevosErrores).some(msg => msg !== '')) {
      setErrorGeneral('Por favor, corrige los campos destacados en el formulario de usuarios.');
      return;
    }

    const payload = {
      nombre: usrNombre.trim(),
      correo: usrCorreo.trim(),
      rol: usrRol.trim().toLowerCase(),
      contrasena: usrContrasena.trim()
    };

    if (usrIdEnEdicion !== null) {
      usuarioService.actualizarUsuario(usrIdEnEdicion, payload);
    } else {
      usuarioService.crearUsuario(payload);
    }

    setUsuarios(usuarioService.listarUsuarios());
    cancelarEdicionUsuario();
  }

  function eliminarUsuarioHandler(id) {
    setErrorGeneral('');
    usuarioService.eliminarUsuario(id);
    setUsuarios(usuarioService.listarUsuarios());
    if (usrIdEnEdicion === id) {
      cancelarEdicionUsuario();
    }
  }

  return (
    <PlantillaPublica>
      <div className="container py-4 text-white">
        
        {/* ENCABEZADO */}
        <div className="bg-dark p-3 rounded shadow-sm mb-4 border border-secondary">
          <h2 className="h4 fw-bold mb-0 text-white">Panel de Administración</h2>
          <small className="text-light">Gestión de Productos, Categorías, Usuarios, Ítems Críticos y Pedidos</small>
        </div>

        {/* ÁTOMO DE ERROR GLOBAL */}
        <Error mensaje={errorGeneral} variante="danger" />

        {/* MÓDULO 1: CRUD DE PRODUCTOS */}
        <div className="row g-4 text-dark mb-5">
          <div className="col-12">
            <h4 className="text-white border-bottom border-secondary pb-2">Catálogo de Productos</h4>
          </div>

          <div className="col-md-5">
            <FormularioProducto
              codigo={codigo} setCodigo={setCodigo}
              categoria={categoria} setCategoria={setCategoria}
              nombre={nombre} setNombre={setNombre}
              marca={marca} setMarca={setMarca}
              modelo={modelo} setModelo={setModelo}
              stock={stock} setStock={setStock}
              precio={precio} setPrecio={setPrecio}
              descripcion={descripcion} setDescripcion={setDescripcion}
              imagen={imagen} setImagen={setImagen}
              idEnEdicion={idEnEdicion}
              errores={errores} setErrores={setErrores}
              categoriasDisponibles={categorias}
              onGuardar={guardarProducto}
              onCancelar={cancelarEdicion}
              onCargarArchivo={manejarCargaArchivoImagen}
            />
          </div>

          <div className="col-md-7">
            <div className="admin-tabla-contenedor">
              <TablaProductos
                productos={productos}
                umbralStock={umbralStock}
                onActivarEdicion={activarEdicion}
                onEliminar={eliminar}
              />
            </div>
          </div>
        </div>

        {/* MÓDULO 2: CRUD DE CATEGORÍAS */}
        <div className="row g-4 text-dark mb-5">
          <div className="col-12">
            <h4 className="text-white border-bottom border-secondary pb-2">Gestión de Categorías</h4>
          </div>

          <div className="col-md-5">
            <FormularioCategoria
              nombreCategoria={catNombre}
              setNombreCategoria={setCatNombre}
              categoriaEnEdicion={catEnEdicion}
              errorCategoria={catError}
              setErrorCategoria={setCatError}
              onGuardar={guardarCategoria}
              onCancelar={cancelarEdicionCategoria}
            />
          </div>

          <div className="col-md-7">
            <div className="admin-tabla-contenedor">
              <TablaCategoria
                categorias={categorias}
                onActivarEdicion={activarEdicionCategoria}
                onEliminar={eliminarCategoriaHandler}
              />
            </div>
          </div>
        </div>

        {/* MÓDULO 3: CRUD DE USUARIOS */}
        <div className="row g-4 text-dark mb-5">
          <div className="col-12">
            <h4 className="text-white border-bottom border-secondary pb-2">Gestión de Usuarios</h4>
          </div>

          <div className="col-md-5">
            <FormularioUsuario
              nombre={usrNombre} setNombre={setUsrNombre}
              correo={usrCorreo} setCorreo={setUsrCorreo}
              rol={usrRol} setRol={setUsrRol}
              contrasena={usrContrasena} setContrasena={setUsrContrasena}
              confirmarContrasena={usrConfirmarContrasena} setConfirmarContrasena={setUsrConfirmarContrasena}
              idEnEdicion={usrIdEnEdicion}
              errores={usrErrores} setErrores={setUsrErrores}
              onGuardar={guardarUsuario}
              onCancelar={cancelarEdicionUsuario}
            />
          </div>

          <div className="col-md-7">
            <div className="admin-tabla-contenedor">
              <TablaUsuarios
                usuarios={usuarios}
                onActivarEdicion={activarEdicionUsuario}
                onEliminar={eliminarUsuarioHandler}
              />
            </div>
          </div>
        </div>

        {/* MÓDULO 4: ÍTEMS CRÍTICOS */}
        <div className="row g-4 text-dark mb-5">
          <div className="col-12">
            <h4 className="text-white border-bottom border-secondary pb-2">Control de Ítems Críticos</h4>
          </div>

          <div className="col-12">
            <div className="admin-tabla-contenedor">
              <TablaCriticos
                productos={productos}
                umbralStock={umbralCritico}
                setUmbralStock={setUmbralCritico}
              />
            </div>
          </div>
        </div>

        {/* MÓDULO 5: RESUMEN DE PEDIDOS / SOLICITUDES */}
        <div className="row g-4 text-dark pt-2">
          <div className="col-12">
            <h4 className="text-white border-bottom border-secondary pb-2">Control y Resumen de Solicitudes</h4>
          </div>

          <div className="col-md-6">
            {compras.length === 0 ? (
              <p className="text-white-50">No hay solicitudes registradas.</p>
            ) : (
              compras.map((compra, index) => (
                <ResumenPedido key={index} compra={compra} />
              ))
            )}
          </div>
        </div>

      </div>
    </PlantillaPublica>
  );
}

