import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/firebase/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class Navbar {
  logo = 'assets/logo.png';


  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = this.authService.currentUser;
  isAuthenticated = this.authService.isAuthenticated;

  // Signals de rol
  userRole = this.authService.userRole;
  esAdmin = this.authService.esAdmin;
  esProgramador = this.authService.esProgramador;

  favoritesService: any;

  /**
 * Navega a la página de login
 */
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  /**
   * Verifica si el usuario está autenticado
   */
  // isAuthenticated(): boolean {
  //   return this.authService.isAuthenticated();
  // }
  // isAuthenticated = computed(() => this.currentUser() !== null);

  /**
   * Cierra la sesión del usuario
   */
  logout() {
    if (confirm('¿Cerrar sesión?')) {
      this.authService.logout().subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error al cerrar sesión:', error);
        }
      });
    }
  }
  /** ------------------------
  *  SCROLL DE EQUIPO
  * --------------------------
  */
  async scrollToPerfiles(event: Event) {
    event.preventDefault();

    const scrollToElement = () => {
      const el = document.getElementById('equipo');
      if (!el) return;

      // Distancia real hasta el elemento
      const top = el.getBoundingClientRect().top + window.scrollY;

      // Altura del navbar (ajústalo si cambia)
      const navbarHeight = 90;

      window.scrollTo({
        top: top - navbarHeight,
        behavior: 'smooth'
      });
    };

    // Si ya estás en /inicio simplemente hace scroll
    if (this.router.url.includes('/inicio')) {
      scrollToElement();
      return;
    }

    // Si vienes de otra página
    await this.router.navigate(['/inicio']);

    // Espera un momento a que cargue la vista
    setTimeout(() => scrollToElement(), 120);
  }

  /** ------------------------
  *  SCROLL DE PROYECTOSS
  * --------------------------
  */

  async scrollToProjects(event: Event) {
    event.preventDefault();

    const go = () => {
      const el = document.getElementById('proyectos');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    // Si ya estás en /inicio, solo baja
    if (this.router.url.includes('/inicio')) {
      go();
      return;
    }

    // Si estás en otra ruta, navega a /inicio sin fragmentos
    await this.router.navigate(['/inicio']);

    // Espera a que cargue la vista y luego baja
    setTimeout(() => go(), 80);

  }

  /** ------------------------
   *  SCROLL DEL BOTON INICIO
   * --------------------------
   * /
   
 /** Subir al top sin cambiar la URL visible */
  private scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /** Comportamiento único del botón Inicio */
  async goHome(event: Event) {
    event.preventDefault();

    // Si ya estamos en /inicio, solo subir al top
    if (this.router.url.includes('/inicio')) {
      this.scrollToTop();
      return;
    }

    // Si estamos en otra ruta, navegar a /inicio y luego subir
    try {
      await this.router.navigate(['/inicio']);
      // Pequeña espera para que la vista se renderice (ajusta si hace falta)
      setTimeout(() => this.scrollToTop(), 80);
    } catch (err) {
      console.error('Error al navegar a /inicio:', err);
    }
  }

}