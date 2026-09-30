export default function CampoTexto({ valor, alCambiar, tipo = "text", placeholder }) {
  return (
    <input 
      type={tipo} 
      className="form-control" 
      value={valor} 
      onChange={(e) => alCambiar(e.target.value)} 
      placeholder={placeholder} 
    />
  );
}
