
import React from 'react';

export default function Error({ mensaje, variante = "danger" }) {
  if (!mensaje) return null;

  return (
    <div className={`alert alert-${variante} py-2 px-3 small text-center mb-3`} role="alert">
      {mensaje}
    </div>
  );
}