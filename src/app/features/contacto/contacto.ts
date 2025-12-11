import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Injector, runInInjectionContext, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Footer } from '../../componentes/footer/footer';

// Firebase
import { Auth, user } from '@angular/fire/auth';
import { Firestore, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore';

// HTTP
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contacto',
  imports: [CommonModule, FormsModule, Footer],
  templateUrl: './contacto.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contacto {

  // ============================
  // VARIABLES
  // ============================
  solicitudes: any[] = [];

  form = {
    nombre: '',
    correo: '',
    horario: '',
    mensaje: ''
  };

  usuarioEmail: string | null = null;

  contactoInfo = {
    email: 'contacto@miempresa.com',
    telefono: '+593 099 000 0000',
    direccion: 'Quito, Ecuador'
  };

  // ============================
  // INYECCIONES
  // ============================
  auth = inject(Auth);
  firestore = inject(Firestore);
  http = inject(HttpClient);
  cdr = inject(ChangeDetectorRef);

  constructor() {

    // ⭐ Reemplaza authState() → user() (Elimina warning de AngularFire)
    user(this.auth).subscribe(u => {
      this.usuarioEmail = u ? u.email : null;
      console.log('Usuario logueado:', this.usuarioEmail);
      // 🔄 Recargar solicitudes cuando cambia el usuario
      this.verSolicitudes();
    });

  }

ngOnInit(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // 🔹 Cargar solicitudes automáticamente al abrir la página
  this.verSolicitudes();
}


  // ============================
  // CARGAR SOLICITUDES
  // ============================
async verSolicitudes() {
  try {
    const ref = collection(this.firestore, 'solicitudes');

    let q;
    if (this.usuarioEmail) {
      // Filtrar por usuario logueado
      q = query(ref, where('usuario', '==', this.usuarioEmail));
    } else {
      // Traer todas las solicitudes si no hay usuario logueado
      q = query(ref);
    }

    const snap = await getDocs(q);
    this.solicitudes = snap.docs.map(d => d.data());
    
    // 🔄 Notificar al detector de cambios (importante con OnPush)
    this.cdr.markForCheck();
    
    console.log('Solicitudes cargadas:', this.solicitudes);
  } catch (error) {
    console.error('Error al cargar solicitudes:', error);
  }
}




  injector = inject(Injector);

  // ============================
  // ENVIAR FORMULARIO
  // ============================
  async enviarFormulario() {

    if (!this.usuarioEmail) {
      alert('Debes iniciar sesión para enviar solicitudes.');
      return;
    }

    try {
      const url = 'https://formsubmit.co/ajax/chicotato04@gmail.com';

      // FormSubmit usa FormData
      const formData = new FormData();
      formData.append("name", this.form.nombre);
      formData.append("email", this.form.correo);
      formData.append("horario", this.form.horario);
      formData.append("mensaje", this.form.mensaje);
      formData.append("usuario", this.usuarioEmail);
      formData.append("_captcha", "false");

      // Enviar correo
      await this.http.post(url, formData).toPromise();

      // ⭐⭐ FIREBASE DENTRO DEL CONTEXTO
      await runInInjectionContext(this.injector, async () => {

        const ref = collection(this.firestore, 'solicitudes');

        await addDoc(ref, {
          usuario: this.usuarioEmail,
          nombre: this.form.nombre,
          correo: this.form.correo,
          horario: this.form.horario,
          mensaje: this.form.mensaje,
          fecha: new Date().toLocaleString(),
        });

      });

      alert('Solicitud enviada correctamente.');

      // Resetear form
      this.form = { nombre: '', correo: '', horario: '', mensaje: '' };

      // Recargar
      await this.verSolicitudes();
      this.cdr.markForCheck();

    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al enviar la solicitud.');
    }
  }
}