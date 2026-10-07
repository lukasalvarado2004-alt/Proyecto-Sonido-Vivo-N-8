// src/components/molecules/CampoFormulario.jsx
import CampoTexto from '../atoms/CampoTexto';

export default function CampoFormulario({ icono, valor, alCambiar, tipo, placeholder, error }) {
  return (
    <div className="formulario-grupo-input mb-3">
      {icono && <span className="formulario-icono">{icono}</span>}

      <CampoTexto 
        valor={valor} 
        alCambiar={alCambiar} 
        tipo={tipo} 
        placeholder={placeholder} 
      />

      {error && (
        <small className="text-danger d-block text-start mt-1 ms-1 fw-bold">
          {error}
        </small>
      )}
    </div>
  );
}