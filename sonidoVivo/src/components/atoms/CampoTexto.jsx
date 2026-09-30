export default function CampoTexto({ valor, alCambiar, tipo = "text", placeholder }) {

 return (

  <input 

   type={tipo} 

   className="form-control bg-transparent border-0 py-2" 

   value={valor} 

   onChange={(e) => alCambiar(e.target.value)} 

   placeholder={placeholder}

   style={{ fontSize: '14px', outline: 'none', boxShadow: 'none' }}

  />

 );

}

