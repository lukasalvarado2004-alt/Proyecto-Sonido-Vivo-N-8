import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import CatalogoProducto from '../components/organisms/CatalogoProducto';
import Buscador from '../components/organisms/Buscador';
import FiltroCategoria from '../components/molecules/FiltroCategoria';
import { useProductos } from '../context/ProductosContext';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { filtrarProductos } from '../utils/filtrarProductos';

export default function Inicio() {
  const productosCtx = useProductos();
  const todosLosProductos = productosCtx.productos || [];

  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [busquedaAplicada, setBusquedaAplicada] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');

  useTituloPagina('Inicio');

  const categoriasUnicas = Array.from(
    new Set(todosLosProductos.map((p) => p.categoria).filter(Boolean))
  );

  const productosEnOferta = todosLosProductos.filter((p) => p.esOferta === true);

  const manejarBuscar = (e) => {
    e.preventDefault();
    setBusquedaAplicada(textoBusqueda.trim());
  };

  const manejarLimpiar = () => {
    setTextoBusqueda('');
    setBusquedaAplicada('');
  };

  const productosFiltrados = filtrarProductos(todosLosProductos, {
    texto: busquedaAplicada,
    categoria: categoriaSeleccionada,
  });

  return (
    <PlantillaPublica>
      <Container className="py-4">
        {/* ORGANISMO BUSCADOR HERO EXTRAÍDO */}
        <Buscador
          textoBusqueda={textoBusqueda}
          setTextoBusqueda={setTextoBusqueda}
          busquedaAplicada={busquedaAplicada}
          onBuscar={manejarBuscar}
          onLimpiar={manejarLimpiar}
        />

        {/* MÓDULO DESTACADO: OFERTAS EN PROMOCIÓN */}
        {!busquedaAplicada && categoriaSeleccionada === 'todas' && productosEnOferta.length > 0 && (
          <section className="mb-5 p-4 rounded-3 bg-dark bg-opacity-50 border border-warning border-opacity-50 shadow-sm">
            <div className="d-flex align-items-center justify-content-between mb-3 border-bottom border-warning pb-2">
              <h2 className="h3 fw-bold text-warning mb-0 d-flex align-items-center gap-2">
                 Ofertas e Ítems en Promoción
              </h2>
              <span className="badge bg-danger fs-6 px-3 py-2">
                ¡Precios Especiales!
              </span>
            </div>
            <CatalogoProducto productos={productosEnOferta} />
          </section>
        )}

        {/* CATÁLOGO GENERAL */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <div>
            <h2 className="h4 fw-bold text-white mb-1">
              {busquedaAplicada || categoriaSeleccionada !== 'todas' 
                ? 'Resultados de Búsqueda' 
                : 'Todos los Productos'}
            </h2>
            <FiltroCategoria
              categorias={categoriasUnicas}
              categoriaSeleccionada={categoriaSeleccionada}
              onSeleccionarCategoria={setCategoriaSeleccionada}
            />
          </div>

          {busquedaAplicada && (
            <div className="text-secondary small align-self-md-center">
              Resultados para: <span className="text-warning fw-bold">"{busquedaAplicada}"</span>
            </div>
          )}
        </div>

        {productosFiltrados.length > 0 ? (
          <CatalogoProducto productos={productosFiltrados} />
        ) : (
          <div className="text-center py-5 bg-dark rounded border border-secondary my-4">
            <h4 className="text-white mb-2">No se encontraron productos</h4>
            <p className="text-secondary mb-3">
              No hay coincidencias para tu búsqueda{' '}
              {busquedaAplicada ? `"${busquedaAplicada}"` : ''}.
            </p>
            <Button
              variant="outline-warning"
              onClick={() => {
                manejarLimpiar();
                setCategoriaSeleccionada('todas');
              }}
            >
              Ver todos los productos
            </Button>
          </div>
        )}
      </Container>
    </PlantillaPublica>
  );
}