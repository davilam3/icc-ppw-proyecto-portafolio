import { computed, inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User, user } from '@angular/fire/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private auth: Auth = inject(Auth);
    private firestore: Firestore = inject(Firestore);

    // Aquí guardamos al usuario autenticado
    user = signal<any | null>(null);

    // Signal para el usuario actual
    currentUser = signal<User | null>(null);

    // Signal para el ROL del usuario
    userRole = signal<'admin' | 'programador' | 'usuario' | null>(null);

    // Observable del estado de autenticación
    user$ = user(this.auth);

    // constructor() {
      // Suscribirse a cambios en el estado de autenticación
    //   this.user$.subscribe(user => {
    //     this.currentUser.set(user);
    //   });
    // }
    constructor() {
        onAuthStateChanged(this.auth, async (user) => {
            this.currentUser.set(user);
            // Cuando el usuario cambia, obtener su rol
            if (user) {
                await this.cargarRolUsuario(user.uid);
            } else {
                this.userRole.set(null);
            }
        });
    }


    /**
     * Registrar nuevo usuario con email y password
     */
    register(email: string, password: string): Observable<any> {
        const promise = createUserWithEmailAndPassword(this.auth, email, password);
        return from(promise);
    }

    /**
     * Login con email y password
     */
    login(email: string, password: string): Observable<any> {
        const promise = signInWithEmailAndPassword(this.auth, email, password);
        return from(promise);
    }

    /**
     * Login con Google
     */
    loginWithGoogle(): Observable<any> {
        const provider = new GoogleAuthProvider();
        const promise = signInWithPopup(this.auth, provider);
        return from(promise);
    }

    /**
      * Cerrar sesión
      */
    logout(): Observable<void> {
        const promise = signOut(this.auth);
        return from(promise);
    }
    // ---------------------------
    // ESTADO DE AUTENTICACIÓN
    // ---------------------------

    isAuthenticated = computed(() => this.currentUser() !== null);

    /**
     * Carga el rol del usuario desde Firestore
     */
    private async cargarRolUsuario(uid: string) {
        try {
            console.log('🔍 Buscando rol en Firestore para UID:', uid);
            const userDoc = await getDoc(doc(this.firestore, 'usuarios', uid));
            
            if (!userDoc.exists()) {
                console.warn('⚠️ Documento no existe en Firestore para UID:', uid);
                this.userRole.set('usuario');
                return;
            }
            
            const rol = userDoc.data()?.['rol'] || 'usuario';
            console.log('✅ Rol encontrado en Firestore:', rol);
            this.userRole.set(rol as 'admin' | 'programador' | 'usuario');
        } catch (error) {
            console.error('❌ Error obteniendo rol:', error);
            this.userRole.set('usuario');
        }
    }

    /**
     * Verifica si el usuario es administrador
     */
    esAdmin = computed(() => this.userRole() === 'admin');

    /**
     * Verifica si el usuario es programador
     */
    esProgramador = computed(() => this.userRole() === 'programador');

    /**
     * Obtiene el rol actual del usuario
     */
    getRol() {
        return this.userRole();
    }

}

export { Auth };