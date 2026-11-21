# Proyecto Semestral — Equipo 8

### Curso: Desarrollo FullStack II  — Duoc UC 2026

---

##  Integrantes

* **Franco Villarroel** — fra.villarroelg@duocuc.cl
* **Nicolás Vega** — nicola.vegac@duocuc.cl
* **Lukas Tirapegui** — lu.tirapegui@duocuc.cl

---

##  Caso de Negocio

* **Caso Asignado:** Sonido Vivo 

### Descripción del Caso

**Sonido Vivo** es una tienda de Viña del Mar que vende instrumentos y equipos musicales de forma presencial. La aplicación web resuelve la falta de un catálogo digital actualizado y centralizado, permitiendo a los clientes remotos cotizar, comprar en línea de manera automatizada y hacer seguimiento a sus despachos. Esto optimiza el control de inventario en tiempo real para el dueño y elimina la pérdida de ventas provocada por la gestión manual a través de WhatsApp o Instagram.

---

##  Estructura del Proyecto (`src/`)

```text
src/
├── assets/          # Archivos estáticos, recursos globales e imágenes de instrumentos.
├── components/
│   ├── atoms/       # Componentes mínimos e indivisibles (Boton, CampoTexto, Error, etc.).
│   ├── molecules/   # Combinación de dos o más átomos (CampoFormulario, ResumenPedido, etc.).
│   ├── organisms/   # Estructuras complejas que forman secciones de la app (Navbar, ControlSolicitudes, etc.).
│   └── templates/   # Esquemas de diseño de página (PlantillaPublica, PlantillaAdmin).
├── context/         # Contextos globales de React (ContenidoCarrito, ProductosContext).
├── data/            # Archivos JSON con datos iniciales (Usuarios.json, CompraData.json, etc.).
├── hooks/           # Hooks personalizados de React (useTituloPagina, etc.).
├── pages/           # Vistas finales asociadas a las rutas (Catalogo, Carrito, Seguimiento, Admin, etc.).
├── service/         # Lógica de servicios y persistencia con localStorage / API (usuarioService, etc.).
├── App.css          # Estilos CSS específicos de la aplicación base.
├── App.jsx          # Componente raíz con enrutamiento de React Router DOM y proveedores.
├── index.css        # Estilos CSS globales y variables de diseño.
└── main.jsx         # Punto de entrada de React para renderizar en el DOM de Vite.
```

---

##  Tecnologías Utilizadas

* **React:** Biblioteca principal para la construcción de la interfaz de usuario interactiva.
* **Vite:** Herramienta de empaquetado y entorno de desarrollo frontend ultra rápido.
* **React Bootstrap & Bootstrap 5:** Librería de componentes UI e íconos para acelerar el desarrollo visual.
* **CSS 3:** Estilos adaptativos mediante Flexbox y Grid para cumplir con el diseño responsive obligatorio.
* **Vitest & React Testing Library:** Framework y utilidades para la ejecución de pruebas unitarias.

---

##  Cómo Ejecutar el Proyecto

Sigue estos pasos para clonar el repositorio:

### 1. Clonar el repositorio

```bash
git clone https://github.com/lukasalvarado2004-alt/Proyecto-Sonido-Vivo-N-8.git
```

### 2. Acceder a la carpeta del proyecto

```bash
cd Proyecto-Sonido-Vivo-N-8/sonidoVivo
```

### 3. Instalar las dependencias del proyecto

```bash
npm install
```

### 4. Levantar el servidor de desarrollo

```bash
npm run dev
```

---

##  Ejecución de Pruebas Unitarias 

El proyecto incluye pruebas unitarias automatizadas configuradas con **Vitest** y **React Testing Library**.

### 1. Instalar dependencias de testing (si es necesario)

Si estás configurando el entorno de pruebas por primera vez o agregándolo a un proyecto existente, instala los paquetes de desarrollo necesarios:

```bash
npm install -D vitest @vitest/coverage-v8 jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### 2. Ejecutar las pruebas 

```bash
npm test
```

### 3. Generar reporte de cobertura de código 

```bash
npm run test:cov
```

---
## Material Complementario

* https://drive.google.com/drive/folders/1TMLiE_IwBiIOgN34_W6DmoD_rMoCpfB2?usp=drive_link
