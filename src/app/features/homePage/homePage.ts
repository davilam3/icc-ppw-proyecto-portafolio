import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Navbar } from "../../componentes/navbar/navbar";
import { Footer } from "../../componentes/footer/footer";
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, RouterLink, Footer],
  templateUrl: './homePage.html',
  styleUrl: './homePage.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
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
