import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsesoriasService } from '../../core/services/asesorias.service';
import { RolesService } from '../../core/services/roles.service';

@Component({
  selector: 'app-programador-asesorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './programador-asesorias.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProgramadorAsesorias {
  private asesoriasService = inject(AsesoriasService);
  private rolesService = inject(RolesService);

  asesorias: any[] = [];
  uid = '';

  constructor() {
    this.init();
  }

  async init() {
    const usuario = await this.rolesService.obtenerDatosUsuarioActual();
    if (!usuario) return;
    this.uid = usuario.uid;
    await this.load();
  }

  async load() {
    if (!this.uid) return;
    const raw = await this.asesoriasService.obtenerSolicitudesPorProgramador(this.uid);
    this.asesorias = await Promise.all(raw.map(async (r: any) => {
      if (!r.solicitanteUid) return { ...r, solicitanteEmail: null };
      const u = await this.rolesService.obtenerUsuarioPorId(r.solicitanteUid);
      return { ...r, solicitanteEmail: u?.email || null };
    }));
  }

  async responder(id: string, estado: 'aceptada' | 'rechazada') {
    const respuesta = prompt('Mensaje de confirmación/rechazo (opcional):') || '';
    await this.asesoriasService.actualizarEstadoSolicitud(id, estado, respuesta);
    await this.load();
  }

  verRespuesta(a: any) {
    alert(a.respuesta || 'Sin respuesta');
  }
}
