export function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validarNombre(nombre) {
  return nombre.trim().length >= 4 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre);
}

export function irAConfirmarCompra(navegar) {
  navegar("/confirmar-compra");
}

// CORREGIDO: Declaramos 'navegar' como cuarto parámetro en la función
export function procesarFormularioCompra(evento, vaciarCarrito, setErrores, navegar) {
  evento.preventDefault();
  
  const nombre = evento.target.elements.nombreCompleto.value;
  const email = evento.target.elements.correoElectronico.value;
  const direccion = evento.target.elements.direccionEnvio.value;
  const comuna = evento.target.elements.ciudadComuna.value;

  let erroresTemporales = {};

  if (!nombre.trim()) {
    erroresTemporales.nombreCompleto = "El nombre completo es obligatorio.";
  } else if (!validarNombre(nombre)) {
    erroresTemporales.nombreCompleto = "El nombre debe tener mínimo 4 letras, sin números.";
  }

  if (!email.trim()) {
    erroresTemporales.correoElectronico = "El correo electrónico es obligatorio.";
  } else if (!validarEmail(email)) {
    erroresTemporales.correoElectronico = "Por favor, ingresa un correo electrónico válido.";
  }

  if (!direccion.trim()) {
    erroresTemporales.direccionEnvio = "La dirección de envío es obligatoria.";
  }

  if (!comuna.trim()) {
    erroresTemporales.ciudadComuna = "La ciudad o comuna es obligatoria.";
  }

  setErrores(erroresTemporales);

  if (Object.keys(erroresTemporales).length > 0) {
    return;
  }

  alert("¡Muchas gracias por tu compra en Sonido Vivo! Tu pedido está en camino.");
  vaciarCarrito();
  
  navegar("/");
}
