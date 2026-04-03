# Soccer League Elite ⚽

Soccer League Elite es una plataforma integral para la gestión de ligas de fútbol amateur (fútbol llanero). El sistema permite administrar equipos, jugadores, encuentros y estadísticas de manera eficiente, ofreciendo una interfaz moderna y un backend robusto.

## Tecnologías Utilizadas

### Frontend

  - **Vue.js 3 (Composition API):** Framework progresivo para construir la interfaz de usuario.
  - **TypeScript:** Tipado estático para un desarrollo seguro y escalable.
  - **Tailwind CSS 4:** Estilizado mediante utilidades de última generación.
  - **Vite:** Herramienta de construcción ultra rápida.
  - **Pinia:** Gestión de estado global.
  - **Vue Router:** Navegación entre vistas.

### Backend

  - **Node.js:** Entorno de ejecución para el servidor.
  - **Express.js:** Framework web para la creación de la API RESTful.
  - **MongoDB:** Base de datos NoSQL para el almacenamiento de datos.
  - **Mongoose:** ODM para el modelado de objetos y validación de datos.

-----

## Estructura del Proyecto

El repositorio está dividido en dos directorios principales:

### Frontend (`/frontend`)

Sigue una estructura modular y escalable:

  - `src/api`: Configuraciones de Axios o servicios de fetch.
  - `src/components`: Componentes reutilizables de la interfaz.
  - `src/composables`: Lógica de negocio reutilizable (Hooks).
  - `src/interfaces` & `src/types`: Definiciones de tipos de TypeScript.
  - `src/layouts`: Estructuras base para las páginas.
  - `src/views`: Páginas principales de la aplicación.
  - `src/stores`: Gestión de estados con Pinia.

### Backend (`/backend`)

Implementa un patrón de arquitectura claro:

  - `src/models`: Definición de esquemas de MongoDB.
  - `src/controllers`: Lógica de manejo de peticiones.
  - `src/routes`: Definición de endpoints de la API.
  - `src/middlewares`: Funciones de validación y seguridad.
  - `src/seed.ts`: Scripts para poblar la base de datos con datos iniciales.

-----

## Instalación y Configuración

### Prerrequisitos

  - Node.js (versión 18 o superior recomendada)
  - MongoDB (instancia local o en la nube)

### Configuración del Backend

1.  Navega a la carpeta del backend:
    ```bash
    cd backend
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Crea un archivo `.env` basado en los requerimientos del sistema (Puerto, URI de MongoDB).
4.  Inicia el servidor en modo desarrollo:
    ```bash
    npm run dev
    ```

### Configuración del Frontend

1.  Navega a la carpeta del frontend:
    ```bash
    cd frontend
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```

-----

## Características Principales

  - **Gestión de Plantillas:** Control detallado de jugadores por equipo.
  - **Administración de Equipos:** Creación y edición de perfiles de clubes.
  - **Calendario de Juegos:** Organización de jornadas y encuentros.
  - **Diseño Responsivo:** Optimizado para su uso en dispositivos móviles y escritorio.

-----

## Autor

  - **Aldair Cruz Bautista** - *Desarrollador Fullstack* - [Acruzbautista501](https://www.google.com/search?q=https://github.com/Acruzbautista501)
