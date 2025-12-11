import { Injectable, inject } from '@angular/core';
import { Auth, user, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc, getDoc, getDocs, query, where, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario, Programador, Administrador } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  // ============================
  // INYECCIONES
  // ============================
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  /**
   * Observable del usuario actual autenticado
   */
  currentUser$ = user(this.auth);

  /**
   * Obtiene el rol del usuario actual
   */
  currentUserRole$ = this.currentUser$.pipe(
    map(async (authUser) => {
      if (!authUser) return null;

      try {
        const userDoc = await getDoc(doc(this.firestore, 'usuarios', authUser.uid));
        return userDoc.data()?.['rol'] || 'usuario';
      } catch (error) {
        console.error('Error al obtener rol:', error);
        return 'usuario';
      }
    })
  );

  // ============================
  // REGISTRAR USUARIO
  // ============================

  /**
   * Registra un nuevo usuario administrador
   * Solo debe ser llamado por otro administrador
   */
  async registrarAdmin(email: string, password: string, nombre: string): Promise<Administrador> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const uid = userCredential.user.uid;

    const admin: Administrador = {
      uid,
      email,
      nombre,
      rol: 'admin',
      fechaRegistro: new Date(),
      activo: true,
      permiso_crear_usuarios: true,
      permiso_editar_usuarios: true,
      permiso_eliminar_usuarios: true,
      permiso_gestionar_contenido: true
    };

    await setDoc(doc(this.firestore, 'usuarios', uid), admin);
    return admin;
  }

  /**
   * Registra un nuevo programador
   * Puede ser llamado por administrador o por registro público
   */
  async registrarProgramador(
    email: string,
    password: string,
    datosBasicos: {
      nombre: string;
      especialidad: string;
      descripcion: string;
      fotoPerfil: string;
      habilidades: string[];
      contacto: { telefono?: string; whatsapp?: string; email: string };
      redesSociales: { github?: string; linkedin?: string; twitter?: string; instagram?: string; portfolio?: string };
    }
  ): Promise<Programador> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const uid = userCredential.user.uid;

    const programador: Programador = {
      uid,
      email,
      nombre: datosBasicos.nombre,
      rol: 'programador',
      especialidad: datosBasicos.especialidad,
      descripcion: datosBasicos.descripcion,
      fotoPerfil: datosBasicos.fotoPerfil,
      contacto: datosBasicos.contacto,
      redesSociales: datosBasicos.redesSociales,
      habilidades: datosBasicos.habilidades,
      proyectos: [],
      fechaRegistro: new Date(),
      activo: true
    };

    await setDoc(doc(this.firestore, 'usuarios', uid), programador);
    return programador;
  }

  /**
   * Registra un usuario externo
   */
  async registrarUsuarioExterno(email: string, password: string, nombre: string): Promise<Usuario> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const uid = userCredential.user.uid;

    const usuarioExterno: Usuario = {
      uid,
      email,
      nombre,
      rol: 'usuario',
      fechaRegistro: new Date(),
      activo: true
    };

    await setDoc(doc(this.firestore, 'usuarios', uid), usuarioExterno);
    return usuarioExterno;
  }

  // ============================
  // LOGIN
  // ============================

  /**
   * Inicia sesión con email y contraseña
   */
  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Cierra sesión
   */
  async logout() {
    return await signOut(this.auth);
  }

  // ============================
  // OBTENER DATOS DE USUARIO
  // ============================

  /**
   * Obtiene los datos completos del usuario actual
   */
  async obtenerDatosUsuarioActual(): Promise<Usuario | null> {
    const authUser = this.auth.currentUser;
    if (!authUser) return null;

    const userDoc = await getDoc(doc(this.firestore, 'usuarios', authUser.uid));
    return userDoc.data() as Usuario || null;
  }

  /**
   * Obtiene los datos de un usuario por su UID
   */
  async obtenerUsuarioPorId(uid: string): Promise<Usuario | null> {
    const userDoc = await getDoc(doc(this.firestore, 'usuarios', uid));
    return userDoc.data() as Usuario || null;
  }

  /**
   * Obtiene todos los programadores registrados
   */
  async obtenerTodosProgramadores(): Promise<Programador[]> {
    const q = query(collection(this.firestore, 'usuarios'), where('rol', '==', 'programador'));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as Programador);
  }

  /**
   * Obtiene todos los usuarios con un rol específico
   */
  async obtenerUsuariosPorRol(rol: 'admin' | 'programador' | 'usuario'): Promise<Usuario[]> {
    const q = query(collection(this.firestore, 'usuarios'), where('rol', '==', rol));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as Usuario);
  }

  // ============================
  // EDITAR USUARIO
  // ============================

  /**
   * Edita los datos de un programador
   */
  async editarProgramador(uid: string, datos: Partial<Programador>): Promise<void> {
    await updateDoc(doc(this.firestore, 'usuarios', uid), datos);
  }

  /**
   * Edita datos básicos de cualquier usuario
   */
  async editarUsuario(uid: string, datos: Partial<Usuario>): Promise<void> {
    await updateDoc(doc(this.firestore, 'usuarios', uid), datos);
  }

  // ============================
  // ELIMINAR USUARIO (Admin)
  // ============================

  /**
   * Desactiva un usuario (marca como inactivo)
   * No elimina completamente para mantener referencial integrity
   */
  async desactivarUsuario(uid: string): Promise<void> {
    await updateDoc(doc(this.firestore, 'usuarios', uid), {
      activo: false
    });
  }

  /**
   * Verifica si el usuario actual es administrador
   */
  async esAdmin(): Promise<boolean> {
    const usuario = await this.obtenerDatosUsuarioActual();
    return usuario?.rol === 'admin';
  }

  /**
   * Verifica si el usuario actual es programador
   */
  async esProgramador(): Promise<boolean> {
    const usuario = await this.obtenerDatosUsuarioActual();
    return usuario?.rol === 'programador';
  }

  /**
   * Verifica si el usuario actual es usuario externo
   */
  async esUsuarioExterno(): Promise<boolean> {
    const usuario = await this.obtenerDatosUsuarioActual();
    return usuario?.rol === 'usuario';
  }
}