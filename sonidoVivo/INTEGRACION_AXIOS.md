# Sonido Vivo — integración Axios + Spring Boot (API de usuarios)

## Rutas reales (verificadas en el código del backend)

- `POST /api/v1/usuarios`: registro público (nombre, correo, contrasena, telefono, direccion). Devuelve 201.
- `POST /api/v1/auth/login`: `{correo, contrasena}`; devuelve JWT.
- `GET /api/v1/auth/me`: perfil del usuario con Bearer JWT.
- `GET /api/v1/usuarios`: solo ADMINISTRADOR.
- `PUT /api/v1/usuarios/{id}`: nombre, telefono y direccion; titular o ADMINISTRADOR.
- `PATCH /api/v1/usuarios/{id}/rol`: solo ADMINISTRADOR y no sobre sí mismo.
- `DELETE /api/v1/usuarios/{id}`: solo ADMINISTRADOR y no sobre sí mismo; 204 sin cuerpo.

No existe API de productos en el backend proporcionado: catálogo, categorías y compras siguen con persistencia local de la versión original.

## Ejecución

1. Backend: configurar **fuera del repositorio** las variables de Oracle/JWT y su wallet originales. `docker compose up -d --build` desde el repositorio backend (según su README). No publicar credenciales ni wallet.
2. Frontend: en `sonidoVivo`, ejecutar `npm install` (agrega Axios y actualiza package-lock.json).
3. Copiar `.env.example` a `.env` y poner `VITE_API_URL=http://localhost:8081/api/v1` o `http://IP_PUBLICA_DEL_BACKEND:8081/api/v1` si el navegador está en otra máquina.
4. `npm run dev -- --host 0.0.0.0`; abrir la URL que muestre Vite.
5. Configurar `CORS_ORIGENES` del backend con el origen **exacto** del frontend (protocolo, IP/dominio y puerto), reiniciar backend si cambia.

**Nota sobre AWS**: `localhost` siempre indica la máquina del navegador, no la EC2. Si el frontend se sirve bajo HTTPS, también se necesita HTTPS accesible para la API (evitar mixed content). No exponer el wallet ni las variables de entorno.

## Flujo y manejo de errores

`Registro.jsx / Login.jsx / AdminProductos.jsx` → `service/usuarioService.js` → `services/api.js` → Spring Boot. El DTO se prepara en `src/dto/usuario.dto.js`; la respuesta se transforma al formato `correo`/`rol` que esperan los componentes. Mensajes de 400/401/403/409 y errores de conexión/timeout se muestran dentro de la página, sin `alert`.

El JWT se mantiene en `sessionStorage` (al cerrar la pestaña se pierde) y el perfil público de sesión se guarda en `localStorage` para la barra de navegación. No se almacenan contraseñas. Tras recargar, si el token se perdió, hay que volver a iniciar sesión.

El backend **no permite** cambiar el correo o contraseña por `PUT /usuarios/{id}`; por eso editar usuarios solo modifica nombre, teléfono, dirección y opcionalmente rol. Crear desde el panel registra primero como CLIENTE y luego cambia el rol si la cuenta autenticada es administradora.

**Pruebas**: abrir herramientas F12 → Network → Fetch/XHR. Registrar: POST `/usuarios` 201. Login: POST `/auth/login` 200 y GET `/auth/me` 200. Panel administrador: GET `/usuarios` 200. Eliminar otra cuenta: DELETE 204. Si falta permiso, el backend debe responder 403.

**Limitación de comprobación:** se revisó el código y se prepararon pruebas unitarias, pero no se pudo ejecutar la API con Oracle ni realizar `npm install` contra el registro desde este entorno. Instalar dependencias con `npm install` antes de ejecutar `npm run test:run` o `npm run build`.
