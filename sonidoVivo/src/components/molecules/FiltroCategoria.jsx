import React from 'react';
import { Form } from 'react-bootstrap';

function FiltroCategoria(props) {
  return (
    <Form.Group className="mb-4 filtro-categoria-container">
      <Form.Label className="text-white fw-semibold">Filtrar por categoría:</Form.Label>
      <Form.Select
        value={props.categoriaSeleccionada}
        onChange={(e) => props.onSeleccionarCategoria(e.target.value)}
        className="bg-dark text-white border-secondary"
      >
        <option value="todas">Todas las categorías</option>
        {props.categorias.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

export default FiltroCategoria;