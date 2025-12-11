import { Routes } from '@angular/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HomePage } from './features/homePage/homePage';
import { PerfilPageDiana } from './features/perfilPageDiana/perfilPageDiana';
import { PerfilPageSebas } from './features/perfilPageSebas/perfilPageSebas';
import { publicGuard } from './core/guards/public-guard';

export const routes: Routes = [


    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
    },

    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/pages/login-page/login-page').then(m => m.LoginPage),
        //canActivate: [publicGuard]
    },

    {
        path: 'register',
        loadComponent: () =>
            import('./features/auth/pages/register-page/register-page').then(m => m.RegisterPage),
        canActivate: [publicGuard]
    },
    {
        path: 'inicio',
        loadComponent: () =>
            import('./features/homePage/homePage').then(m => m.HomePage),
    },
    {
        path: 'contacto',
        loadComponent: () =>
            import('./features/contacto/contacto').then(m => m.Contacto),
    },

    {
        path: 'diana',
        loadComponent: () =>
            import('./features/perfilPageDiana/perfilPageDiana').then(m => m.PerfilPageDiana),
    },

    {
        path: 'sebas',
        loadComponent: () =>
            import('./features/perfilPageSebas/perfilPageSebas').then(m => m.PerfilPageSebas),
    },

    {
        path: '**',
        redirectTo: 'inicio'
    }
];
