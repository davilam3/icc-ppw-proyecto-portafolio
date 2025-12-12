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
8. Despliegue en Gh-Pages

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
* <div style="display: flex; align-items: center; gap: 16px;"> <img src="./public/assets/angular.svg" width="50" alt="D&S Logo"> <p style="margin:0; padding:0;">HTML5</p> </div>

* <div style="display: flex; align-items: center; gap: 16px;"> <img src="./public/assets/tail.png" width="50" alt="tailwind"> <p style="margin:0; padding:0;">TailwindCSS + DaisyUI</p> </div>

* <div style="display: flex; align-items: center; gap:px;"> <img src="./public/assets/html5.png" width="80" alt="html5"> <p style="margin:0; padding:0;">HTML5</p> </div>


### Backend (Serverless)

* Firebase Authentication
* Firestore Database

---
## 3. 📂 Arquitectura del Sistema

```
/src
   /── app
      /── componentes
         ├── back-to-top
         ├── footer
         ├── navbar
      /── core
         ├── guards
         ├── models
         ├── services
      /── features
         ├── admin-panel
         ├── auth
         ├── contacto
         ├── homePage
         ├── perfilPageDiana
         ├── perfilPageSebas
         ├── programador-asesorias
         ├── programador-panel
README.md
```
---
## 4. Funcionalidades Principales
#### Autenticación

* Inicio de sesión con Google.
* Login con correo/contraseña .
* Manejo de sesión.

####  Gestión de Usuarios

* El administrador puede crear, editar y eliminar programadores.
* Cada programador administra su propio portafolio.
* Los usuarios no autenticados pueden ver la página web pero no solicitar asesorías.
* Los usuarios autenticados pueden ver la página web y solicitar asesorías.

####  Gestión de Portafolios

* Perfil profesional (nombre, especialidad, descripción, foto).
* Proyectos Académicos
* Proyectos Laborales

####  Gestión de Proyectos

Cada proyecto incluye:
* Nombre
* Imagen
* Descripción
* Rol (Frontend, Backend)
* Tecnologías usadas
* Enlace a los proyectos
* Enlace a repositorio


####  Gestión de Asesorías

* Registro de datos personales
* Registro de horarios por parte del administrador.
* Mensaje por parte del usuario.
* Panel del programador para aceptar/rechazar.
---
## 5. 📂 Estructura de Datos (Firestore)

```
/solicitudes
   /── UID
         ├── correo
         ├── fecha
         ├── horario
         ├── mensaje
         ├── nombre
         ├── usuario
```
```
/usuarios
   /── UID_1
         ├── email
         ├── nombre
         ├── rol
   /── UID_2
         ├── email
         ├── nombre
         ├── rol
   /── UID_3
         ├── email
         ├── nombre
         ├── rol
```

---
## 6. Módulos y Vistas de la Aplicación

### Usuario No Autenticado
* Home
* Lista de programadores
* Contacto
* No Agendar asesoría

### Usuario Autenticado
* Home
* Lista de programadores
* Contacto
* Agendar asesoría

### Autenticación

* Login con Google o correo (usuarios)
* Registro de programadores.
* Registro de Admin

### Administrador

* Dashboard
* Gestión de usuarios programadores
* Agregar, editar, eliminar, actualizar

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
---
### 8. Despliegue en Gh-Pages