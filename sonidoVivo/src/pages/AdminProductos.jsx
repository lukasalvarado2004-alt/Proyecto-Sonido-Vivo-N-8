// src/pages/AdminProductos.jsx
import React, { useState, useEffect } from 'react';
import { obtenerMensajeError } from '../services/obtenerMensajeError';
import PlantillaAdmin from '../components/templates/PlantillaAdmin'; 
import { useProductos } from '../context/ProductosContext';
import Error from '../components/atoms/Error';

import FormularioProducto from '../components/organisms/FormularioProducto';
import TablaProductos from '../components/organisms/TablaProductos';
import FormularioUsuario from '../components/organisms/FormularioUsuario';
import TablaUsuarios from '../components/organisms/TablaUsuario';
import TablaCriticos from '../components/organisms/TablaCriticos';
import FormularioCategoria from '../components/organisms/FormularioCategoria';
import TablaCategoria from '../components/organisms/TablaCategoria';
import { ResumenPedido } from '../components/molecules/ResumenPedido';
import EncabezadoPanel from '../components/molecules/EncabezadoPanel';
import * as usuarioService from '../service/usuarioService.js';
import * as categoriaService from '../service/categoriaService.js';
import { useMisPedidos } from '../hooks/useMisPedidos';
import { resumenPedido } from '../service/pedidoService';

import { 
  validarNombre,
  validarCorreo,
  validarContrasena,
  validarConfirmarContrasena,
  validarRol,
  validarNombreCategoria
} from '../utils/validaciones.js';

export default function AdminProductos({ titulo }) {
  const { productos, error: errorCatalogo, crear, actualizar, eliminar } = useProductos();

  const [umbralStock] = useState(5);
  const [errorGeneral, setErrorGeneral] = useState('');

  const [umbralCritico, setUmbralCritico] = useState(5);

  const [categorias, setCategorias] = useState(() => categoriaService.listarCategorias());
  const [catNombre, setCatNombre] = useState('');
  const [catEnEdicion, setCatEnEdicion] = useState(null);
  const [catError, setCatError] = useState('');

  const [guardandoProducto, setGuardandoProducto] = useState(false);
  const [idEnEdicion, setIdEnEdicion] = useState(null);
  const [errores, setErrores] = useState({});
  const [categoria, setCategoria] = useState('');
  const [nombre, setNombre] = useState('');
  const [stock, setStock] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');

  const [usuarios, setUsuarios] = useState([]);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(false);
  const [guardandoUsuario, setGuardandoUsuario] = useState(false);
  const [usrTelefono, setUsrTelefono] = useState('');
  const [usrDireccion, setUsrDireccion] = useState('');

  async function recargarUsuarios(signal) {
    setCargandoUsuarios(true);
    try {
      setUsuarios(await usuarioService.listarUsuarios(signal));
    } catch (error) {
      if (error.code !== 'ERR_CANCELED') setErrorGeneral(obtenerMensajeError(error));
    } finally {
      if (!signal?.aborted) setCargandoUsuarios(false);
    }
  }
  useEffect(() => {
    const controller = new AbortController();
    recargarUsuarios(controller.signal);
    return () => controller.abort();
  }, []);
  const [usrIdEnEdicion, setUsrIdEnEdicion] = useState(null);
  const [usrErrores, setUsrErrores] = useState({});
  const [usrNombre, setUsrNombre] = useState('');
  const [usrCorreo, setUsrCorreo] = useState('');
  const [usrRol, setUsrRol] = useState('cliente');
  const [usrContrasena, setUsrContrasena] = useState('');
  const [usrConfirmarContrasena, setUsrConfirmarContrasena] = useState('');

  const { pedidos, mensaje: mensajePedidos } = useMisPedidos();
  const compras = pedidos.map(p => resumenPedido(p, productos));

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
    
    setErrorGeneral('');
    categoriaService.eliminarCategoria(cat);
    setCategorias(categoriaService.listarCategorias());
    if (catEnEdicion === cat) {
      cancelarEdicionCategoria();
    }
  }

  function activarEdicion(p) {
    setErrorGeneral('');
    setIdEnEdicion(p.id ?? p.codigo);
    setCategoria(String(p.idCategoria));
    setNombre(p.nombre || '');
    setStock(String(p.stock ?? ''));
    setPrecio(String(p.precio ?? ''));
    setDescripcion(p.descripcion || '');
    setImagen(p.imagen || '');
    setErrores({});
  }

  function cancelarEdicion() {
    setErrorGeneral('');
    setIdEnEdicion(null);
    setCategoria(''); setNombre(''); 
    setStock(''); setPrecio(''); setDescripcion(''); setImagen('');
    setErrores({});
  }

  async function guardarProducto(e) {
    e.preventDefault();
    setErrorGeneral('');
    if (guardandoProducto) return;
    const fallos = {};
    if (!Number.isSafeInteger(Number(categoria)) || Number(categoria) < 1) fallos.categoria = 'Ingresa el ID de una categoría existente.';
    if (nombre.trim().length < 2 || nombre.trim().length > 150) fallos.nombre = 'Ingresa de 2 a 150 caracteres.';
    if (stock === '' || !Number.isInteger(Number(stock)) || Number(stock) < 0) fallos.stock = 'Ingresa un entero desde cero.';
    if (!/^\d{1,8}(\.\d{1,2})?$/.test(precio) || Number(precio) <= 0) fallos.precio = 'Precio positivo, hasta 8 enteros y 2 decimales.';
    if (descripcion.trim().length > 500) fallos.descripcion = 'Máximo 500 caracteres.';
    if (imagen.trim().length > 255) fallos.imagen = 'Máximo 255 caracteres.';
    setErrores(fallos);
    if (Object.keys(fallos).length) return;
    const datos = { idCategoria: Number(categoria), nombre: nombre.trim(), stock: Number(stock),
      precio: Number(precio), descripcion: descripcion.trim(), imagen: imagen.trim() };
    setGuardandoProducto(true);
    try {
      if (idEnEdicion === null) await crear(datos);
      else await actualizar(idEnEdicion, datos);
      cancelarEdicion();
    } catch (error) { setErrorGeneral(obtenerMensajeError(error)); }
    finally { setGuardandoProducto(false); }
  }

  async function eliminarDelCatalogo(id) {
    setErrorGeneral('');
    try { await eliminar(id); }
    catch (error) { setErrorGeneral(obtenerMensajeError(error)); }
  }

  function activarEdicionUsuario(u) {
    setErrorGeneral('');
    setUsrIdEnEdicion(u.id);
    setUsrNombre(u.nombre || '');
    setUsrCorreo(u.correo || '');
    setUsrTelefono(u.telefono || '');
    setUsrDireccion(u.direccion || '');
    setUsrRol(u.rol || 'cliente');
    setUsrContrasena('');
    setUsrConfirmarContrasena('');
    setUsrErrores({});
  }

  function cancelarEdicionUsuario() {
    setErrorGeneral('');
    setUsrIdEnEdicion(null);
    setUsrNombre('');
    setUsrCorreo('');
    setUsrTelefono('');
    setUsrDireccion('');
    setUsrRol('cliente');
    setUsrContrasena('');
    setUsrConfirmarContrasena('');
    setUsrErrores({});
  }

  async function guardarUsuario(e) {
    e.preventDefault();
    setErrorGeneral('');
    const editando = usrIdEnEdicion !== null;
    const nuevosErrores = {
      nombre: validarNombre(usrNombre),
      correo: editando ? '' : validarCorreo(usrCorreo),
      contrasena: editando ? '' : (usrContrasena.length < 8 ? 'Mínimo 8 caracteres.' : validarContrasena(usrContrasena)),
      confirmarContrasena: editando ? '' : validarConfirmarContrasena(usrContrasena, usrConfirmarContrasena),
      telefono: /^\+?[0-9]{8,15}$/.test(usrTelefono.trim()) ? '' : 'Teléfono de 8 a 15 dígitos.',
      direccion: usrDireccion.trim().length >= 2 ? '' : 'Dirección obligatoria.',
    };
    setUsrErrores(nuevosErrores);
    if (Object.values(nuevosErrores).some(Boolean)) {
      setErrorGeneral('Corrige los campos del formulario de usuarios.');
      return;
    }
    setGuardandoUsuario(true);
    try {
      const datos = { nombre: usrNombre, correo: usrCorreo, contrasena: usrContrasena,
        telefono: usrTelefono, direccion: usrDireccion };
      if (editando) {
        await usuarioService.actualizarUsuario(usrIdEnEdicion, datos);
        const rolApi = { administrador: 'ADMINISTRADOR', vendedor: 'VENDEDOR', ventas: 'VENDEDOR', cliente: 'CLIENTE' }[usrRol.toLowerCase()];
        if (rolApi && rolApi !== (usuarios.find(u => u.id === usrIdEnEdicion)?.rol || '').toUpperCase()) {
          await usuarioService.cambiarRolUsuario(usrIdEnEdicion, rolApi);
        }
      } else {
        const nuevo = await usuarioService.crearUsuario(datos); // por contrato se crea como CLIENTE
        if (usrRol !== 'cliente') {
          await usuarioService.cambiarRolUsuario(nuevo.id, usrRol === 'administrador' ? 'ADMINISTRADOR' : 'VENDEDOR');
        }
      }
      await recargarUsuarios();
      cancelarEdicionUsuario();
    } catch (error) {
      setErrorGeneral(obtenerMensajeError(error));
    } finally { setGuardandoUsuario(false); }
  }

  async function eliminarUsuarioHandler(id) {
    setErrorGeneral('');
    try {
      await usuarioService.eliminarUsuario(id);
      setUsuarios(prev => prev.filter(u => u.id !== id));
      if (usrIdEnEdicion === id) cancelarEdicionUsuario();
    } catch (error) { setErrorGeneral(obtenerMensajeError(error)); }
  }

  return (
    <PlantillaAdmin>
      <div className="container py-4 text-white">
        
        {errorCatalogo && <p role="alert">{errorCatalogo}</p>}
        <EncabezadoPanel 
          titulo={titulo} 
          subtitulo="Gestión de Productos, Categorías, Usuarios, Ítems Críticos y Pedidos" 
        />  

        <Error mensaje={errorGeneral} variante="danger" />

        <div className="row g-4 text-dark mb-5">
          <div className="col-12">
            <h4 className="text-white border-bottom border-secondary pb-2">Catálogo de Productos</h4>
          </div>
          <div className="col-md-5">
            <FormularioProducto
              guardando={guardandoProducto} categoriasCatalogo={Array.from(new Map(productos.map(p => [p.idCategoria, p.categoria])))}
              categoria={categoria} setCategoria={setCategoria} nombre={nombre} setNombre={setNombre} stock={stock} setStock={setStock} precio={precio} setPrecio={setPrecio} descripcion={descripcion} setDescripcion={setDescripcion} imagen={imagen} setImagen={setImagen} idEnEdicion={idEnEdicion} errores={errores} setErrores={setErrores} onGuardar={guardarProducto} onCancelar={cancelarEdicion}
            />
          </div>
          <div className="col-md-7">
            <div className="admin-tabla-contenedor">
              <TablaProductos productos={productos} umbralStock={umbralStock} onActivarEdicion={activarEdicion} onEliminar={eliminarDelCatalogo} />
            </div>
          </div>
        </div>

        <div className="row g-4 text-dark mb-5">
          <div className="col-12">
            <h4 className="text-white border-bottom border-secondary pb-2">Categorías locales de demostración</h4>
          </div>
          <div className="col-md-5">
            <FormularioCategoria
              nombreCategoria={catNombre} setNombreCategoria={setCatNombre} categoriaEnEdicion={catEnEdicion} errorCategoria={catError} setErrorCategoria={setCatError} onGuardar={guardarCategoria} onCancelar={cancelarEdicionCategoria}
            />
          </div>
          <div className="col-md-7">
            <div className="admin-tabla-contenedor">
              <TablaCategoria categorias={categorias} onActivarEdicion={activarEdicionCategoria} onEliminar={eliminarCategoriaHandler} />
            </div>
          </div>
        </div>

        <div className="row g-4 text-dark mb-5">
          <div className="col-12">
            <h4 className="text-white border-bottom border-secondary pb-2">Gestión de Usuarios</h4>
          </div>
          <div className="col-md-5">
            <FormularioUsuario
              nombre={usrNombre} setNombre={setUsrNombre} correo={usrCorreo} setCorreo={setUsrCorreo} rol={usrRol} setRol={setUsrRol} telefono={usrTelefono} setTelefono={setUsrTelefono} direccion={usrDireccion} setDireccion={setUsrDireccion} contrasena={usrContrasena} setContrasena={setUsrContrasena} confirmarContrasena={usrConfirmarContrasena} setConfirmarContrasena={setUsrConfirmarContrasena} idEnEdicion={usrIdEnEdicion} errores={usrErrores} setErrores={setUsrErrores} onGuardar={guardarUsuario} onCancelar={cancelarEdicionUsuario}
            />
          </div>
          <div className="col-md-7">
            <div className="admin-tabla-contenedor">
              <p className="small text-muted">{cargandoUsuarios ? "Cargando usuarios..." : guardandoUsuario ? "Guardando usuario..." : "Datos consultados a la API"}</p>
              <TablaUsuarios usuarios={usuarios} onActivarEdicion={activarEdicionUsuario} onEliminar={eliminarUsuarioHandler} />
            </div>
          </div>
        </div>

        <div className="row g-4 text-dark mb-5">
          <div className="col-12">
            <h4 className="text-white border-bottom border-secondary pb-2">Control de Ítems Críticos</h4>
          </div>
          <div className="col-12">
            <div className="admin-tabla-contenedor">
              <TablaCriticos productos={productos} umbralStock={umbralCritico} setUmbralStock={setUmbralCritico} />
            </div>
          </div>
        </div>

        <div className="row g-4 text-dark pt-2">
          <div className="col-12">
            <h4 className="text-white border-bottom border-secondary pb-2">Pedidos de esta cuenta</h4>
          </div>
          <div className="col-md-6">
            {compras.length === 0 ? (
              <p className="text-white-50">{mensajePedidos}</p>
            ) : (
              compras.map((compra) => (
                
                <ResumenPedido key={compra.nroSolicitud} compra={compra} />
              ))
            )}
          </div>
        </div>

      </div>
    </PlantillaAdmin>
  );
}
