export default function Boton({ alHacerClic, textoBoton }) {
  return (
    <button className="btn btn-primary w-100" onClick={alHacerClic}>
      {textoBoton}
    </button>
  );
}
