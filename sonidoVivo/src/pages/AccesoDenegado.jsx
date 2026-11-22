import { Link } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';

export default function AccesoDenegado() {
  return (
    <PlantillaPublica>
      <section className="container py-5 text-center">
        <h1>403 · Acceso denegado</h1>
        <p>Tu cuenta no tiene permiso para entrar a este panel.</p>
        <Link to="/catalogo">Volver al catálogo</Link>
      </section>
    </PlantillaPublica>
  );
}