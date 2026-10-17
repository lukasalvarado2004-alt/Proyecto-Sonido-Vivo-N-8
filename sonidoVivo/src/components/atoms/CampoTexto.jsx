export default function CampoTexto(props) {
  
  const tipoInput = props.tipo || "text"; 

  return (
    <input
      type={tipoInput}
      className="formulario-input-native"
      placeholder={props.placeholder}
      value={props.valor}
      onChange={(e) => props.alCambiar(e.target.value)}
    />
  );
}
