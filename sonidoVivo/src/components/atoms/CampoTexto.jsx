export default function CampoTexto({ valor, alCambiar, tipo = "text", placeholder }) {
  return (
    <input
      type={tipo}
      className="formulario-input-nativo"
      placeholder={placeholder}
      value={valor}
      onChange={(e) => alCambiar(e.target.value)}
    />
  );
}
