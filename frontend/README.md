# ⚽ Sistema de Gestión - Club de Fútbol

Plataforma web Full-Stack desarrollada para la administración centralizada de una institución deportiva. Permite gestionar el padrón de socios, realizar un seguimiento de los resultados de los partidos y fomenta la comunicación mediante un muro de novedades, con control de acceso basado en roles (RBAC).

## 🚀 Características Principales

- **Autenticación y Roles:** Sistema de login y registro. Roles definidos de `Admin` (lectura/escritura) y `Socio` (solo lectura y participación).
- **Gestión de Socios (CRUD):** Alta, baja y modificación del padrón de socios (Exclusivo Admin).
- **Resultados Deportivos:** Panel para cargar resultados del fin de semana y visualización en tiempo real para la comunidad.
- **Muro Interactivo:** Espacio de avisos parroquiales y novedades donde los socios pueden comentar.
- **Comisión Directiva:** Sección institucional con las autoridades del club.
- **Diseño Responsivo (SPA):** Interfaz fluida (Single Page Application) adaptable a celulares y escritorio.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React.js, Vite, CSS (Variables y flexbox/grid).
- **Backend:** Node.js, Express.js.
- **Base de Datos:** MySQL.
- **Control de Versiones:** Git / GitHub.

## ⚙️ Requisitos Previos

Para ejecutar este proyecto en un entorno local, es necesario contar con:

- [Node.js](https://nodejs.org/) (v16 o superior)
- Servidor MySQL (XAMPP, WAMP, o MySQL Workbench)

## 📦 Instalación y Ejecución

Siga estos pasos para levantar el sistema en su máquina local:

### 1. Base de Datos

1. Abrir phpMyAdmin o su gestor de bases de datos preferido.
2. Crear una base de datos vacía.
3. Importar el archivo `backup_club.sql` ubicado en la carpeta raíz del proyecto.

### 2. Configuración del Backend (Servidor)

1. Abrir una terminal y navegar a la carpeta del backend: `cd backend`
2. Instalar las dependencias:
   ```bash
   npm install
   ```
