import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RolesService } from '../../core/services/roles.service';
import { ProjectsService } from '../../core/services/projects.service';
import { AsesoriasService } from '../../core/services/asesorias.service';

@Component({
  selector: 'app-programador-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './programador-panel.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProgramadorPanel {
  private rolesService = inject(RolesService);
  private projectsService = inject(ProjectsService);
  private asesoriasService = inject(AsesoriasService);

  uid = '';
  proyectos: any[] = [];
  asesorias: any[] = [];

  constructor() {
    this.init();
  }

  async init() {
    const usuario = await this.rolesService.obtenerDatosUsuarioActual();
    if (!usuario) return;
    this.uid = usuario.uid;
    await this.loadProyectos();
    await this.loadAsesorias();
  }

  async loadProyectos() {
    if (!this.uid) return;
    this.proyectos = await this.projectsService.obtenerProyectosPorProgramador(this.uid);
  }

  async crearProyectoHandler() {
    const nombre = prompt('Nombre del proyecto:');
    if (!nombre) return;
    const descripcion = prompt('Descripción:') || '';
    await this.projectsService.crearProyecto(this.uid, { nombre, descripcion });
    await this.loadProyectos();
  }

  async editarProyectoHandler(project: any) {
    const nombre = prompt('Nombre:', project.nombre) || project.nombre;
    const descripcion = prompt('Descripción:', project.descripcion) || project.descripcion;
    await this.projectsService.actualizarProyecto(project.id, { nombre, descripcion });
    await this.loadProyectos();
  }

  async eliminarProyectoHandler(id: string) {
    if (!confirm('Eliminar proyecto?')) return;
    await this.projectsService.eliminarProyecto(id);
    await this.loadProyectos();
  }

  async loadAsesorias() {
    if (!this.uid) return;
    const raw = await this.asesoriasService.obtenerSolicitudesPorProgramador(this.uid);
    // Enriquecer cada solicitud con el email del solicitante (si existe)
    const enriched = await Promise.all(raw.map(async (r: any) => {
      if (!r.solicitanteUid) return { ...r, solicitanteEmail: null };
      try {
        const u = await this.rolesService.obtenerUsuarioPorId(r.solicitanteUid);
        return { ...r, solicitanteEmail: u?.email || null };
      } catch (err) {
        console.error('Error obteniendo solicitante:', err);
        return { ...r, solicitanteEmail: null };
      }
    }));

    this.asesorias = enriched;
  }

  async responderAsesoria(id: string, estado: 'aceptada' | 'rechazada') {
    const respuesta = prompt('Mensaje de confirmación/rechazo (opcional):') || '';
    await this.asesoriasService.actualizarEstadoSolicitud(id, estado, respuesta);
    await this.loadAsesorias();
  }
}
