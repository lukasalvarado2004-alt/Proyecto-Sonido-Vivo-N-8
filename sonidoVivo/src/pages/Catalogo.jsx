import { Container } from "react-bootstrap";
import CatalogoProducto from "../components/organisms/CatalogoProducto";
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useTituloPagina } from '../hooks/useTituloPagina';

// 1. IMPORTAMOS EL HOOK DEL CONTEXTO GLOBAL
import { useProductos } from '../context/ProductosContext';

function Catalogo() { // <-- Eliminamos "props" de los parámetros ya que leeremos del contexto
  
  // 2. CONECTAMOS EL CATÁLOGO AL CONTEXTO EN VIVO
  const productosCtx = useProductos();
  const productos = productosCtx.productos || [];

  useTituloPagina('Catálogo');

  function alComprar(nombre) {
    alert('Compraste ' + nombre);
  }

  return (
    <PlantillaPublica>
      <Container className="py-4">
        <h1 className="my-4 text-white">Catálogo de Productos</h1>
        
        {/* 3. El organismo ahora recibe la lista dinámica del LocalStorage */}
        <CatalogoProducto 
          productos={productos} 
          onComprar={alComprar} 
        />
      </Container>
    </PlantillaPublica>
  );
}

export default Catalogo;
