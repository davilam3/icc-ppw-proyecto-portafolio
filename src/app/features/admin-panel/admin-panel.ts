import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RolesService } from '../../core/services/roles.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-panel.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class AdminPanel {
  private rolesService = inject(RolesService);

  programadores: any[] = [];

  emailInput = '';
  roleToAssign: 'admin' | 'programador' | 'usuario' = 'programador';
  assignResult: boolean | null = null;
  assignMessage = '';
  // Para creación/actualización por UID
  uidInput = '';
  nombreInput = '';
  roleInput: 'admin' | 'programador' | 'usuario' = 'programador';
  presetResults: { email: string; ok: boolean; message: string }[] = [];

  constructor() {
    this.loadProgramadores();
  }

  async loadProgramadores() {
    try {
      this.programadores = await this.rolesService.obtenerTodosProgramadores();
    } catch (err) {
      console.error('Error cargando programadores:', err);
    }
  }

  async asignarRolPorEmailHandler() {
    if (!this.emailInput) return;
    try {
      const ok = await this.rolesService.asignarRolPorEmail(this.emailInput.trim(), this.roleToAssign);
      this.assignResult = ok;
      this.assignMessage = ok ? 'Rol asignado correctamente.' : 'No se encontró usuario con ese correo.';
      if (ok) await this.loadProgramadores();
    } catch (err) {
      console.error(err);
      this.assignResult = false;
      this.assignMessage = 'Error al asignar rol.';
    }
  }

  async desactivarHandler(uid: string) {
    if (!confirm('Desactivar usuario?')) return;
    try {
      await this.rolesService.desactivarUsuario(uid);
      await this.loadProgramadores();
    } catch (err) {
      console.error(err);
    }
  }

  async editarProgramadorHandler(uid: string) {
    const nuevoNombre = prompt('Nuevo nombre (dejar vacío para no cambiar):');
    if (nuevoNombre === null) return; // cancelado
    const datos: any = {};
    if (nuevoNombre) datos.nombre = nuevoNombre;
    try {
      await this.rolesService.editarProgramador(uid, datos);
      await this.loadProgramadores();
    } catch (err) {
      console.error('Error editando:', err);
    }
  }

  async crearUsuarioPorUID() {
    if (!this.uidInput) return alert('Proporciona UID');
    try {
      await this.rolesService.crearOActualizarUsuario(this.uidInput.trim(), {
        email: this.emailInput || undefined,
        nombre: this.nombreInput || 'Sin nombre',
        rol: this.roleInput,
        fechaRegistro: new Date(),
        activo: true
      } as any);
      alert('Usuario creado/actualizado en Firestore');
      this.uidInput = '';
      this.nombreInput = '';
      await this.loadProgramadores();
    } catch (err) {
      console.error(err);
      alert('Error al crear/actualizar usuario');
    }
  }

  async applyPresetRoles() {
    const items = [
      { email: 'test@mail.com', rol: 'admin' as const },
      { email: 'avila.dianam04@gmail.com', rol: 'programador' as const },
      { email: 'chicotato04@gmail.com', rol: 'programador' as const }
    ];

    try {
      this.presetResults = await this.rolesService.asignarRolesBulk(items);
      await this.loadProgramadores();
    } catch (err) {
      console.error('Error aplicando preset roles:', err);
      this.presetResults = items.map(i => ({ email: i.email, ok: false, message: 'Error' }));
    }
  }

}
