![logo ups](./public/assets/upslogo.png)

<div style="display: flex; align-items: center; gap: 16px;"> <img src="./public/assets/logo.jpg" width="80" alt="D&S Logo"> <h1 style="margin:0; padding:0;">Proyecto Portafolio D&S | Dev Studio</h1> </div>


**Asignatura:** Programación y Plataformas Web

**Tema:** Proyecto Portafolio Angular

---
#### Autores

**Diana Avila** 
📧 davilam3@est.ups.edu.ec 
💻 GitHub: [Diana Avila](https://github.com/davilam3)
**Sebastian Cabrera**
📧 ccabreram1@est.ups.edu.ec 
💻 GitHub: [Sebastian Cabrera](https://github.com/Ccabreram1)


---

## Índice

1. Descripción General
2. Tecnologías Utilizadas
3. Arquitectura del Sistema
4. Funcionalidades Principales
5. Estructura de Datos (Firestore)
6. Módulos y Vistas de la Aplicación
7. Roles y Permisos
8. Instalación y Configuración
9. Despliegue en Firebase Hosting
Capturas (Sugeridas)

---

## 1. Descripción general del proyecto
Este proyecto es una aplicación web tipo portafolio administrable que permite:

* Gestionar usuarios con diferentes roles.

* Administrar portafolios individuales para programadores.

* Registrar y visualizar proyectos académicos o laborales.

* Gestionar disponibilidad de asesorías.

* Realizar solicitudes de asesorías y responderlas.

* Autenticarse con Google mediante Firebase Authentication.

* Desplegar la aplicación en Firebase Hosting.

---

## 2. Tecnologías Utilizadas
### Frontend
* Angular
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg" width="80" alt="Angular Logo">

* TailwindCSS + DaisyUI
* HTML5

### Backend (Serverless)

* Firebase Authentication
* Firestore Database
* Firebase Storage
* Firebase Hosting

---
## 3. 📂 Arquitectura del Sistema

```
/angular
   ├── docente
      ├── 01_instalacion.md
      ├── 02_navegacion_forms.md
   ├── perez_torres
      ├── 01_instalacion.md
      ├── 02_navegacion_forms.md
/react
   ├── perez_torres
      ├── 01_instalacion.md
      ├── 02_navegacion_forms.md
/vue
   ├── perez_torres
      ├── 01_instalacion.md
      ├── 02_navegacion_forms.md
/astro
   ├── perez_torres
      ├── 01_instalacion.md
      ├── 02_navegacion_forms.md
README.md
```
---
## 4. Funcionalidades Principales
#### Autenticación

* Inicio de sesión con Google.
* Login con correo/contraseña (opcional).
* Manejo de sesión persistente.

####  Gestión de Usuarios

* El administrador puede crear, editar y eliminar programadores.
* Cada programador administra su propio portafolio.
* Los usuarios externos pueden ver portafolios y solicitar asesorías.

####  Gestión de Portafolios

* Perfil profesional (nombre, especialidad, descripción, foto).

Secciones:
* Proyectos Académicos
* Proyectos Laborales

####  Gestión de Proyectos

Cada proyecto incluye:

* Nombre
* Descripción
* Rol (Frontend, Backend)
* Tecnologías usadas
* Enlace a repositorio
* Imagen

####  Gestión de Asesorías

* Registro de horarios por parte del administrador.
* Solicitud por parte del usuario final.
* Panel del programador para aceptar/rechazar.
---
## 5. 📂 Estructura de Datos (Firestore)


---
## 6. Módulos y Vistas de la Aplicación
### Público

* Home
* Lista de programadores
* Portafolio individual
* Agendar asesoría

### Autenticación

* Login con Google
* Registro de programadores (solo admin)
* Edición de perfil

### Administrador

* Dashboard
* Gestión de usuarios programadores
* Gestión de disponibilidad
* Lista general de asesorías

### Programador

* Panel personal
* Gestión de proyectos
* Gestión de portafolio
* Solicitudes de asesorías (aceptar o rechazar)
---
### 7. Roles y Permisos
| Rol | Permisos| 
|---------|----------------|
| **Administrador** | CRUD de programadores, horarios y supervisión de asesorías
| **Programador** | Gestionar su portafolio, proyectos y asesorías propias| 
| **Usuario** | Navegar portafolios y solicitar asesorías | 
