import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, GoogleAuthProvider, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

const firebaseConfig = {
  apiKey: "AIzaSyAmQU4bSdu9seME33ew-Upfx_uAUqvUVhI",
  authDomain: "portafolio-ds.firebaseapp.com",
   projectId: "portafolio-ds",
  storageBucket: "portafolio-ds.firebasestorage.app",
  messagingSenderId: "199254646722",
  appId: "1:199254646722:web:21f7b1d0d48bd940a3c05b",
  measurementId: "G-PDMX05FDT8",
  projectNumber: "199254646722",
  version: "2"
};

export const provider = new GoogleAuthProvider()

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    
    // 📩 Habilitar HttpClient
    provideHttpClient()
  ]
};
