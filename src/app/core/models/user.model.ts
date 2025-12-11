/**
 * Interface para usuarios del sistema
 * Define la estructura de datos de cada usuario en Firestore
 */
export interface Usuario {
  uid: string;                    // ID único de Firebase Auth
  email: string;                  // Correo electrónico
  nombre: string;                 // Nombre completo
  rol: 'admin' | 'programador' | 'usuario'; // Tipo de usuario
  fotoPerfil?: string;            // URL de la foto
  fechaRegistro: Date;            // Fecha de creación
  activo: boolean;                // Estado del usuario
}

/**
 * Interface para programadores
 * Extiende la información básica de usuario con datos profesionales
 */
export interface Programador extends Usuario {
  rol: 'programador';
  especialidad: string;           // Ej: "Frontend", "Backend", "Full Stack"
  descripcion: string;            // Breve descripción profesional
  fotoPerfil: string;             // Foto de perfil (requerida)
  contacto: {
    telefono?: string;
    whatsapp?: string;
    email: string;
  };
  redesSociales: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    portfolio?: string;
  };
  habilidades: string[];          // Array de tecnologías/habilidades
  proyectos: string[];            // IDs de proyectos asociados
}

/**
 * Interface para Administradores
 */
export interface Administrador extends Usuario {
  rol: 'admin';
  permiso_crear_usuarios?: boolean;
  permiso_editar_usuarios?: boolean;
  permiso_eliminar_usuarios?: boolean;
  permiso_gestionar_contenido?: boolean;
}

/**
 * Interface para Usuarios externos
 */
export interface UsuarioExterno extends Usuario {
  rol: 'usuario';
  intereses?: string[];
  solicitudes?: string[];         // IDs de solicitudes realizadas
}