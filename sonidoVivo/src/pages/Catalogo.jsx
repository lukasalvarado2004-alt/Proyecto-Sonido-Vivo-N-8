// src/pages/Catalogo.jsx
import React, { useState } from 'react';
import { Container } from "react-bootstrap";
import CatalogoProducto from "../components/organisms/CatalogoProducto";
import FiltroCategoria from "../components/molecules/FiltroCategoria";
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { useProductos } from '../context/ProductosContext';
import { filtrarPorCategoria } from '../utils/filtrarProductos';

function Catalogo() {
  const productosCtx = useProductos();
  const todosLosProductos = productosCtx.productos || [];

  // Estado para la categoría seleccionada
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas");

  useTituloPagina('Catálogo');

  // Extraemos dinámicamente la lista de categorías únicas sin duplicados
  const categoriasUnicas = Array.from(
    new Set(todosLosProductos.map((p) => p.categoria).filter(Boolean))
  );

  // Aplicamos la util de filtrado
  const productosFiltrados = filtrarPorCategoria(todosLosProductos, categoriaSeleccionada);

  return (
    <PlantillaPublica>
      <Container className="py-4">
        <h1 className="my-4 text-white">Catálogo de Productos</h1>

        {/* Filtro por Categoría */}
        <FiltroCategoria
          categorias={categoriasUnicas}
          categoriaSeleccionada={categoriaSeleccionada}
          onSeleccionarCategoria={setCategoriaSeleccionada}
        />

        {/* Muestra únicamente los productos filtrados */}
        <CatalogoProducto
          productos={productosFiltrados}
        />
      </Container>
    </PlantillaPublica>
  );
}

export default Catalogo;