// src/routes/RutaProtegida.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { api } from '../services/api';
import AccesoDenegado from '../pages/AccesoDenegado';

export default function RutaProtegida({ roles }) {
  const [acceso, setAcceso] = useState({ estado: 'cargando' });

  useEffect(() => {
    if (!sessionStorage.getItem('sv_token')) {
      setAcceso({ estado: 'sinSesion' });
      return;
    }

    const controller = new AbortController();

    async function consultarPerfil() {
      try {
        const { data } = await api.get('/auth/me', {
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;

        const rol = String(data?.rol ?? '').trim().toLowerCase();
        setAcceso({ estado: 'autenticado', rol });
      } catch (error) {
        if (controller.signal.aborted) return;

        const codigo = error.response?.status;

        if (codigo === 401) {
          setAcceso({ estado: 'sinSesion' });
        } else if (codigo === 403) {
          setAcceso({ estado: 'denegado' });
        } else {
          setAcceso({ estado: 'error' });
        }
      }
    }

    consultarPerfil();
    return () => controller.abort();
  }, []);

  if (acceso.estado === 'cargando') {
    return (
      <p className="container py-5 text-center" role="status">
        Verificando acceso…
      </p>
    );
  }

  if (acceso.estado === 'sinSesion') {
    return <Navigate to="/login" replace />;
  }

  if (acceso.estado === 'error') {
    return (
      <p className="container py-5 text-center" role="alert">
        No se pudo verificar tu sesión. Recarga la página para volver a intentar.
      </p>
    );
  }

  if (acceso.estado === 'denegado' || !roles.includes(acceso.rol)) {
    return <AccesoDenegado />;
  }

  return <Outlet />;
}