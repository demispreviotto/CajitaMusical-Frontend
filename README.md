🎵 Cajita Musical - Frontend (SvelteKit & TypeScript)
Este es el repositorio del frontend para la aplicación "Cajita Musical", construida con SvelteKit y TypeScript. Nuestro objetivo es crear una experiencia de usuario ligera, rápida y robusta, enfocándonos en un código organizado, legible y eficiente.

✨ Características Principales
La aplicación "Cajita Musical" ofrecerá las siguientes funcionalidades:

Autenticación de Usuarios: Permite a los usuarios registrarse, iniciar sesión y cerrar sesión de forma segura.
Biblioteca de Música Personalizada: Muestra una lista de canciones asociadas al usuario logueado, obtenidas desde el backend.
Reproductor de Música Integrado: Un reproductor funcional para controlar la reproducción de las canciones.
Gestión de Sesiones Segura: Mantiene la sesión del usuario activa para una experiencia fluida.
🗺️ Mapa de Rutas (Estructura de src/routes/)
SvelteKit utiliza un enrutamiento basado en archivos, lo que significa que la estructura de tus carpetas dentro de src/routes/ define directamente las URLs de tu aplicación.

src/routes/
├── +layout.svelte <-- Layout global (cabecera, pie de página, navegación principal)
├── +page.svelte <-- Página de Inicio (URL: `/`)
├── login/
│ └── +page.svelte <-- Página de Inicio de Sesión (URL: `/login`)
├── register/
│ └── +page.svelte <-- Página de Registro de Usuario (URL: `/register`)
├── library/
│ ├── +page.svelte <-- Página de la Biblioteca de Música (URL: `/library`)
│ └── +layout.ts <-- Protección de ruta (middleware de autenticación para esta sección)
├── profile/
│ └── +page.svelte <-- Página de Perfil de Usuario (URL: `/profile`) - (Funcionalidad futura)
└── admin/
└── +page.svelte <-- Panel de Administración / Subida de Música (URL: `/admin`) - (Funcionalidad futura, protegida)
🏗️ Estructura de Componentes y Módulos (src/lib/)
La carpeta src/lib/ contendrá todos nuestros componentes reutilizables, tiendas de estado (stores), utilidades y la lógica de comunicación con el backend, promoviendo la modularidad y la reusabilidad.

src/lib/
├── components/ <-- Componentes UI reutilizables y específicos de la aplicación
│ ├── Button.svelte
│ ├── Input.svelte
│ ├── Header.svelte
│ ├── Footer.svelte
│ ├── MusicListItem.svelte // Componente para mostrar una canción individual en la lista
│ └── AudioPlayer.svelte // Componente para controlar la reproducción de audio
├── stores/ <-- Svelte Stores para la gestión de estado global
│ ├── authStore.ts // Maneja el estado de autenticación (usuario logueado, información, etc.)
│ └── playerStore.ts // Gestiona el estado del reproductor (canción actual, controles)
├── api/ <-- Cliente API para interactuar con tu Backend Go
│ ├── auth.ts // Funciones para `login`, `register` y `logout`
│ ├── music.ts // Funciones para obtener la biblioteca de música y futuras subidas
│ └── client.ts // Configuración base para las solicitudes HTTP (ej. `fetch` wrapper)
├── utils/ <-- Funciones de utilidad genéricas
│ └── cookies.ts // Ayudantes para la manipulación de cookies (si es necesaria la lectura en el cliente)
└── types/ <-- Definiciones de tipos TypeScript (interfaces)
├── auth.ts // Tipos para objetos de usuario, solicitudes de autenticación, etc.
└── music.ts // Tipos para objetos de canciones, respuestas de la biblioteca, etc.
⚙️ Cómo Funciona la Aplicación (Flujo Clave)
Autenticación:

Las páginas de login y register enviarán datos al backend Go a través de las funciones definidas en src/lib/api/auth.ts.
Tras un inicio de sesión exitoso, el backend establecerá una cookie HTTP-only (session_id).
El authStore.ts se actualizará para reflejar el estado de autenticación del usuario, lo que a su vez afectará la navegación en el +layout.svelte.
Para proteger rutas (ej. /library), utilizaremos las funciones load de SvelteKit en +layout.ts o +page.ts para verificar la autenticación y redirigir si es necesario.
Biblioteca de Música:

Al visitar /library, la página usará src/lib/api/music.ts para solicitar la lista de canciones del usuario al backend.
Esta lista se gestionará y se mostrará utilizando componentes como MusicListItem.svelte.
Reproductor de Música:

El AudioPlayer.svelte controlará la reproducción utilizando el elemento <audio> de HTML.
El playerStore.ts mantendrá el estado global de la reproducción para que cualquier parte de la aplicación pueda saber qué canción está sonando.
▶️ Ejecutando el Proyecto
Para poner en marcha tu entorno de desarrollo frontend:

Navega al directorio del proyecto:

Bash

cd cajitamusical-frontend
Instala las dependencias:

Bash

npm install # o yarn install o pnpm install
Inicia el servidor de desarrollo:

Bash

npm run dev -- --open
Esto abrirá tu navegador en http://localhost:5173/ (o un puerto similar) y tu aplicación SvelteKit estará funcionando.
