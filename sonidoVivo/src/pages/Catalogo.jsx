import { Container } from "react-bootstrap";
import CatalogoProducto from "../components/organisms/CatalogoProducto";
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useTituloPagina } from '../hooks/useTituloPagina';

function Catalogo(props) {
  const productos = props.productos || [];

  useTituloPagina('Catálogo');

  function alComprar(nombre) {
    alert('Compraste ' + nombre);
  }

  return (
    <PlantillaPublica>
      <Container className="py-4">
        <h1 className="my-4 text-white">Catálogo de Productos</h1>
        <CatalogoProducto 
          productos={productos} 
          onComprar={alComprar} 
        />
      </Container>
    </PlantillaPublica>
  );
}

export default Catalogo;