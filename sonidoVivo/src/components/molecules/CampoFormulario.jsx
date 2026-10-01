import CampoTexto from '../atoms/CampoTexto';

export default function CampoFormulario({ icono, valor, alCambiar, tipo, placeholder }) {
  return (
    <div className="formulario-grupo-input">
      <span className="formulario-icono">
        {icono}
      </span>

      <CampoTexto 
        valor={valor} 
        alCambiar={alCambiar} 
        tipo={tipo} 
        placeholder={placeholder} 
      />
    </div>
  );
}
