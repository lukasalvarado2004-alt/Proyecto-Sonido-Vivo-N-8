import Boton from "../atoms/Boton";

function TarjetaProducto(props) {
  return (
    <div className="card p-3">
      <h5>{props.nombre}</h5>
      <p>${props.precio.toFixed(2)}</p>
     <Boton 
        textoBoton="Comprar" 
        alHacerClic={props.onComprar} 
        variante="warning" 
      />
    </div>
  );
}

export default TarjetaProducto;