export default function Boton({ alHacerClic, textoBoton, variante = "purple", tipo = "button" }) {
  return (
    <div className="d-grid">
      <button
        type={tipo}
        className={`btn btn-${variante} fw-bold text-white p-2`}
        onClick={alHacerClic}
      >
        {textoBoton}
      </button>
    </div>
  );
}