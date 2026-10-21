import React, { useState } from 'react';
import { Container, Form, InputGroup, Button } from 'react-bootstrap';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import CatalogoProducto from '../components/organisms/CatalogoProducto';
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

  // Obtener categorías únicas dinámicamente
  const categoriasUnicas = Array.from(
    new Set(todosLosProductos.map((p) => p.categoria).filter(Boolean))
  );

  // Manejador del evento submit para la búsqueda (basado en 'ejemplo')
  const manejarBuscar = (e) => {
    e.preventDefault();
    setBusquedaAplicada(textoBusqueda.trim());
  };

  const manejarLimpiar = () => {
    setTextoBusqueda('');
    setBusquedaAplicada('');
  };

  // Filtrar la lista completa según la búsqueda y categoría
  const productosFiltrados = filtrarProductos(todosLosProductos, {
    texto: busquedaAplicada,
    categoria: categoriaSeleccionada,
  });

  return (
    <PlantillaPublica>
      <Container className="py-4">
        {/* Banner principal y Buscador */}
        <div className="bg-dark p-4 p-md-5 rounded-3 mb-4 text-center border border-secondary shadow-lg">
          <h1 className="display-5 fw-bold text-white mb-2">
            Bienvenidos a <span className="text-purple-brand">Sonido Vivo</span>
          </h1>
          <p className="lead text-secondary mb-4">
            Explora nuestro catálogo completo de instrumentos musicales y accesorios.
          </p>

          {/* Formulario Buscador */}
          <Form onSubmit={manejarBuscar} className="mx-auto" style={{ maxWidth: '600px' }}>
            <InputGroup size="lg" className="shadow-sm">
              <Form.Control
                type="search"
                placeholder="¿Qué estás buscando? (ej. Guitarra, Yamaha, SM58...)"
                aria-label="Buscar productos"
                value={textoBusqueda}
                onChange={(e) => setTextoBusqueda(e.target.value)}
                className="bg-black text-white border-secondary"
              />
              <Button type="submit" variant="warning" className="fw-bold px-4">
                🔍 Buscar
              </Button>
              {busquedaAplicada && (
                <Button type="button" variant="outline-secondary" onClick={manejarLimpiar}>
                  Limpiar
                </Button>
              )}
            </InputGroup>
          </Form>
        </div>

        {/* Filtro por Categoría e indicador de resultados */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <FiltroCategoria
            categorias={categoriasUnicas}
            categoriaSeleccionada={categoriaSeleccionada}
            onSeleccionarCategoria={setCategoriaSeleccionada}
          />

          {busquedaAplicada && (
            <div className="text-secondary small align-self-md-center">
              Resultados para: <span className="text-warning fw-bold">"{busquedaAplicada}"</span>
            </div>
          )}
        </div>

        {/* Catálogo de Productos filtrados */}
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