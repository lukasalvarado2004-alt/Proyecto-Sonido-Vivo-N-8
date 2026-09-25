# Proyecto Semestral — Equipo 8

### Curso: Desarrollo FullStack II (DSY1104) — Duoc UC 2026



---



##  Integrantes

*  **Franco Villarroel** — fra.villarroelg@duocuc.cl

*  **Nicolás Vega** — nicola.vegac@duocuc.cl

*  **Lukas Tirapegui** — lu.tirapegui@duocuc.cl



---



##  Caso de Negocio

*  **Caso Asignado:** Sonido Vivo *(Tienda de Instrumentos y Equipos Musicales)*



### Descripción del Caso

**Sonido Vivo** es una tienda de Viña del Mar que vende instrumentos y equipos musicales de forma presencial. La aplicación web resuelve la falta de un catálogo digital actualizado y centralizado, permitiendo a los clientes remotos cotizar, comprar en línea de manera automatizada y hacer seguimiento a sus despachos. Esto optimiza el control de inventario en tiempo real para el dueño y elimina la pérdida de ventas provocada por la gestión manual a través de WhatsApp o Instagram.



---



##  Estructura del Proyecto (`src/`)

```text

src/

├── assets/      # Archivos estáticos, recursos globales e imágenes de instrumentos.

├── components/

│  ├── atoms/     # Componentes mínimos e indivisibles.

│  │  ├── Boton.jsx   # Botón genérico estilizado con React Bootstrap.

│  │  └── Input.jsx   # Control de entrada de datos para formularios.

│  ├── molecules/   # Combinación de dos o más átomos.

│  │  └── CampoFormulario.jsx # Unión de etiqueta, Input y mensaje de error.

│  ├── organisms/   # Estructuras complejas que forman secciones de la app.

│  │  └── Formulario.jsx # Formulario completo con validación y estados.

│  └── templates/   # Esquemas de diseño de página (layouts limpios).

├── pages/       # Vistas finales asociadas a las rutas del sitio.

│  └── Inicio.jsx   # Página principal que orquesta y renderiza los componentes.

├── App.css      # Estilos CSS específicos de la aplicación base.

├── App.jsx      # Componente raíz donde se maneja el enrutamiento y estado global.

├── index.css     # Estilos CSS globales y variables de diseño.

└── main.jsx      # Punto de entrada de React para renderizar en el DOM de Vite.

```








## Tecnologías Utilizadas

*  **React:** Biblioteca principal para la construcción de la interfaz de usuario interactiva.

*  **Vite:** Herramienta de empaquetado y entorno de desarrollo frontend ultra rápido.

*  **React Bootstrap:** Librería de componentes UI para acelerar el desarrollo visual.

*  **Bootstrap / CSS 3:** Estilos adaptativos mediante Flexbox y Grid para cumplir con el diseño responsive obligatorio.





---



##  Cómo Ejecutar el Proyecto

Sigue estos pasos para clonar el repositorio e iniciar el entorno de desarrollo local:



### 1. Clonar el repositorio

Abre tu terminal y ejecuta el siguiente comando:

```bash

https://github.com/lukasalvarado2004-alt/Proyecto-Sonido-Vivo-N-8.git

```



### 2. Acceder a la carpeta del frontend

```bash

cd prototipo-sonido-vivo/frontend-react

```



### 3. Instalar las dependencias del proyecto

```bash

npm install

```



### 4. Levantar el servidor de desarrollo

```bash

npm run dev

```

*Una vez ejecutado, abre la dirección local *



---



##  Material Complementario





https://drive.google.com/drive/folders/1TMLiE_IwBiIOgN34_W6DmoD_rMoCpfB2?usp=drive_link
