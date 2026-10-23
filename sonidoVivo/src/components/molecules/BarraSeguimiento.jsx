import React from 'react';
import { ProgressBar } from 'react-bootstrap';

export default function BarraSeguimiento(props) {
  const pasoActual = props.pasoActual ?? 2;
  const estados = props.estados || ["Pago Confirmado", "Preparando Pedido", "En Camino", "Entregado"];
  const porcentajeProgreso = (pasoActual / (estados.length - 1)) * 100;

  return (
    <div className="my-4 px-3">
      <ProgressBar 
        now={porcentajeProgreso} 
        variant="warning" 
        className="bg-secondary" 
        style={{ height: "10px" }} 
      />
      <div className="d-flex justify-content-between mt-3 text-start small">
        {estados.map((text, index) => (
          <div 
            key={index} 
            className={`fw-bold ${index <= pasoActual ? "text-warning" : "text-white-50"}`} 
            style={{ width: "23%", textAlign: "center" }}
          >
            <div className="fs-4 mb-1">
              {index === 0 ? "🧾" : index === 1 ? "📦" : index === 2 ? "🚛" : "🏠"}
            </div>
            <span className="d-none d-sm-inline">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}