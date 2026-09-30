import CampoTexto from '../atoms/CampoTexto';


export default function CampoFormulario({ icono, valor, alCambiar, tipo, placeholder }) {

 return (

  <div className="input-group mb-3 bg-light rounded align-items-center px-2" style={{ border: '1px solid #e9ecef' }}>
   <span className="bg-transparent border-0 text-muted p-1">

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