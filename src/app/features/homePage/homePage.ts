import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Navbar } from "../../componentes/navbar/navbar";
import { Footer } from "../../componentes/footer/footer";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RolesService } from '../../core/services/roles.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, Footer],
  templateUrl: './homePage.html',
  styleUrl: './homePage.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {

  private rolesService = inject(RolesService); // Usamos RolesService para obtener programadores
  programadores: any[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Cargar programadores
    this.rolesService.getAllProgrammers?.().subscribe((data: any) => {
      this.programadores = data;
    });

    // Detectar fragmentos (#proyectos)
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

}
