// src/pages/Catalogo.jsx
import { Container } from "react-bootstrap";
import CatalogoProducto from "../components/organisms/CatalogoProducto";
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { useProductos } from '../context/ProductosContext';

function Catalogo() {
  const productosCtx = useProductos();
  const productos = productosCtx.productos || [];

  useTituloPagina('Catálogo');

  return (
    <PlantillaPublica>
      <Container className="py-4">
        <h1 className="my-4 text-white">Catálogo de Productos</h1>
        
        <CatalogoProducto
          productos={productos}
        />
      </Container>
    </PlantillaPublica>
  );
}

export default Catalogo;