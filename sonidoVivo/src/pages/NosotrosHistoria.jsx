import React from 'react';
import { Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useTituloPagina } from '../hooks/useTituloPagina';

export default function Blog() {
  useTituloPagina('Blog - Historia de Sonido Vivo');

  return (
    <PlantillaPublica>
      <Container className="py-5 text-white blog-contenedor">
        <article className="bg-dark p-4 p-md-5 rounded-3 border border-secondary shadow-lg">
          
        
          <header className="mb-4 text-center">
            <Badge bg="warning" text="dark" className="px-3 py-2 mb-3 fw-bold fs-6">
               Viña del Mar, Región de Valparaíso
            </Badge>
            <h1 className="fw-bold text-warning display-6 mb-3">
              El Alma de Sonido Vivo: De una Tienda Física en Viña del Mar a la Experiencia Digital para Músicos de Todo Chile
            </h1>
            <div className="text-secondary small border-bottom border-secondary pb-3">
               Publicado por: <strong className="text-light">El Equipo de Sonido Vivo</strong>
            </div>
          </header>

          
          <div className="lh-lg text-light fs-5">
            <p>
              La música no se detiene, y las historias detrás de cada instrumento tampoco. En el corazón de <strong className="text-warning">Sonido Vivo</strong>, siempre ha existido una premisa clara: <em>conectar la pasión musical con las herramientas correctas.</em>
            </p>

            <p>
              Nacimos como una tienda tradicional de instrumentos y equipos de audio en la hermosa ciudad de <strong>Viña del Mar</strong>. Durante años, nuestro mostrador fue el punto de encuentro de guitarristas locales, bajistas buscando su primer amplificador, bateristas equipando su sala de ensayo y productores emergentes en busca del micrófono perfecto. Para nosotros, cada cliente no era solo un comprador, sino un colega en el arte del sonido.
            </p>

            <h2 className="text-purple-brand fw-bold mt-5 mb-3 h3">
               El Desafío: Cuando el Mostrador Físico se Quedó Chico
            </h2>

            <p>
              Con el tiempo, la comunidad alrededor de Sonido Vivo comenzó a crecer más allá de las fronteras de la Quinta Región. Empezaron a llegar mensajes de músicos de Santiago, Concepción, Antofagasta y pueblos del sur, todos buscando la misma atención cercana y la calidad de catálogo que nos caracterizaba en Viña del Mar.
            </p>

            <p>
              Sin embargo, nos enfrentamos a un cuello de botella operativo: <strong>la gestión manual</strong>.
            </p>

            <p>
              Atender consultas por WhatsApp o Instagram, revisar manualmente planillas para ver si quedaba stock de una guitarra específica o cotizar envíos uno a uno generaba demoras, malentendidos y, lamentablemente, ventas perdidas. Un músico emocionado por comprar su instrumento no puede esperar horas para saber si hay disponibilidad. Comprendimos que necesitábamos evolucionar sin perder nuestra esencia.
            </p>

            <h2 className="text-warning fw-bold mt-5 mb-3 h3">
               La Transformación: Una Plataforma Creada por y para Músicos
            </h2>

            <p>
              Decidimos dar el gran salto y construir una <strong>plataforma web e-commerce propia</strong>, diseñada desde cero para resolver de raíz la falta de un catálogo centralizado y actualizado en tiempo real.
            </p>

            <p>
              Nuestra plataforma web no es solo un carrito de compras; es el puente entre la bodega de nuestra tienda física y el hogar de cada músico en Chile. Hoy en día, nuestro sistema permite:
            </p>

            <ul className="list-unstyled d-flex flex-column gap-3 my-4 ms-2">
              <li className="p-3 bg-black rounded border border-secondary">
                <strong className="text-warning d-block mb-1"> Catálogo e Inventario Transparente:</strong>
                <span className="text-secondary small">Sincronización en tiempo real. Si ves una guitarra o un pedal en la web, sabes exactamente cuántas unidades quedan disponibles en bodega sin sorpresas.</span>
              </li>
              <li className="p-3 bg-black rounded border border-secondary">
                <strong className="text-warning d-block mb-1"> Proceso de Compra Automatizado y Seguro:</strong>
                <span className="text-secondary small">Cotizaciones y reservas inmediatas que generan un código de solicitud único (por ejemplo, <code>SV-523423</code>), eliminando las esperas de confirmación manual.</span>
              </li>
              <li className="p-3 bg-black rounded border border-secondary">
                <strong className="text-warning d-block mb-1"> Seguimiento Dinámico de Despachos:</strong>
                <span className="text-secondary small">Transparencia total desde que el pedido es preparado en tienda hasta que llega a tu puerta, con estados claros (Pago Confirmado, Preparando Pedido, En Camino y Entregado).</span>
              </li>
              <li className="p-3 bg-black rounded border border-secondary">
                <strong className="text-warning d-block mb-1"> Gestión Eficiente de Bodega:</strong>
                <span className="text-secondary small">Un panel exclusivo para que nuestro equipo de ventas controle los estados de envío y ajuste el stock físico al instante.</span>
              </li>
            </ul>

            <h2 className="text-warning fw-bold mt-5 mb-3 h3">
              Lo que Nos Mueve: Nuestro Compromiso
            </h2>

            <p>
              La tecnología nos permitió escalar, pero el propósito sigue siendo el mismo. Queremos que tanto un principiante que busca su primera guitarra acústica de estudio, como un músico profesional que renueva su pedalera, encuentren en <strong>Sonido Vivo</strong> la confianza de un catálogo real, precios justos y un servicio ágil.
            </p>

            <p className="fw-semibold text-warning">
              Gracias por ser parte de esta sintonía. La tienda física sigue con sus puertas abiertas en Viña del Mar, pero hoy, Sonido Vivo suena con fuerza en todo Chile.
            </p>
          </div>

          

        </article>
      </Container>
    </PlantillaPublica>
  );
}