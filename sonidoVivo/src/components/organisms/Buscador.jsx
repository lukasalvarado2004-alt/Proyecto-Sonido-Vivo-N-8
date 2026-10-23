import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

export default function BuscadorHero(props) {
  return (
    <div className="bg-dark p-4 p-md-5 rounded-3 mb-4 text-center border border-secondary shadow-lg">
      <h1 className="display-5 fw-bold text-white mb-2">
        Bienvenidos a <span className="text-purple-brand">Sonido Vivo</span>
      </h1>
      <p className="lead text-secondary mb-4">
        Explora nuestro catálogo completo de instrumentos musicales y accesorios.
      </p>

      <Form onSubmit={props.onBuscar} className="mx-auto" style={{ maxWidth: '600px' }}>
        <InputGroup size="lg" className="shadow-sm">
          <Form.Control
            type="search"
            placeholder="¿Qué estás buscando? (ej. Guitarra, Yamaha, SM58...)"
            aria-label="Buscar productos"
            value={props.textoBusqueda}
            onChange={(e) => props.setTextoBusqueda(e.target.value)}
            className="bg-black text-white border-secondary"
          />
          <Button type="submit" variant="warning" className="fw-bold px-4">
            🔍 Buscar
          </Button>
          {props.busquedaAplicada && (
            <Button type="button" variant="outline-secondary" onClick={props.onLimpiar}>
              Limpiar
            </Button>
          )}
        </InputGroup>
      </Form>
    </div>
  );
}