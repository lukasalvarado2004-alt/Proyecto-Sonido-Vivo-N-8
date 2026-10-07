import Boton from "../atoms/Boton";
import ImagenProducto from "../atoms/ImagenProducto";
import Precio from "../atoms/Precio";
import EtiquetaStock from "../atoms/EtiquetaStock";

function TarjetaProducto(props) {
  const tieneStock = props.stock > 0;

  return (
    <div className="card h-100 p-3 shadow-sm">
      <ImagenProducto urlImagen={props.imagen} altTexto={props.nombre} />

      <div className="card-body d-flex flex-column justify-content-between p-0 mt-3">
        <div>
          <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
            <h5 className="card-title fs-6 mb-0 fw-bold">{props.nombre}</h5>
            <EtiquetaStock stock={props.stock} />
          </div>

          <p className="card-text text-muted small mb-2">
            {props.marca} {props.modelo && `· ${props.modelo}`}
          </p>

          <div className="mb-3">
            <Precio monto={props.precio} />
          </div>
        </div>

        <Boton 
          textoBoton={tieneStock ? "Comprar" : "Sin Stock"} 
          alHacerClic={props.onComprar} 
          variante={tieneStock ? "warning" : "secondary"} 
        />
      </div>
    </div>
  );
}

export default TarjetaProducto;