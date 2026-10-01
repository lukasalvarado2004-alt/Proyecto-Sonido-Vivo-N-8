export default function Boton({ alHacerClic, textoBoton, variante = "warning" }) {
  return (
    <div className="d-grid">
      <button 
        type="button" 
        className={`btn btn-${variante} fw-bold text-white p-2`} 
        onClick={alHacerClic}
      >
        {textoBoton}
      </button>
    </div>
  );
}
