import Boton from "../atoms/Boton";
import ImagenProducto from "../atoms/ImagenProducto";

function TarjetaProducto(props) {
  return (
    <div className="card p-3">
      <ImagenProducto 
        urlImagen={props.imagen} 
        altTexto={props.nombre} 

      />

      <h5>{props.nombre}</h5>
      
      <p>{props.marca}</p>
      <p>{props.modelo}</p>
      <p>${props.precio.toFixed(2)}</p>
     <Boton 
        textoBoton="Comprar" 
        alHacerClic={props.onComprar} 
        variante="warning" 
        //no se esta tomando 
      />
    </div>
  );
}

export default TarjetaProducto;




