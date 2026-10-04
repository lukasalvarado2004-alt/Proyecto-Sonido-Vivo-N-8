import Boton from "../atoms/Boton";
import ImagenProducto from "../atoms/ImagenProducto";
import Precio from "../atoms/Precio";
import EtiquetaStock from "../atoms/EtiquetaStock";

function TarjetaProducto({ imagen, nombre, marca, modelo, stock, precio, onComprar }) {
  return (
    <div className="card h-100 p-3 shadow-sm">
      {/* Átomo 1: Imagen */}
      <ImagenProducto urlImagen={imagen} altTexto={nombre} />

      <div className="card-body d-flex flex-column justify-content-between p-0 mt-3">
        <div>
          {/* Nombre + Átomo 2: Etiqueta de Stock */}
          <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
            <h5 className="card-title fs-6 mb-0 fw-bold">{nombre}</h5>
            <EtiquetaStock stock={stock} />
          </div>

          <p className="card-text text-muted small mb-2">
            {marca} {modelo && `· ${modelo}`}
          </p>

          {/* Átomo 3: Precio */}
          <div className="mb-3">
            <Precio monto={precio} />
          </div>
        </div>

        {/* Átomo 4: Botón */}
        <Boton 
          textoBoton={stock > 0 ? "Comprar" : "Sin Stock"} 
          alHacerClic={onComprar} 
          variante={stock > 0 ? "warning" : "secondary"} 
        />
      </div>
    </div>
  );
}

export default TarjetaProducto;