import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      projectId: "sport-match-5648d",
      appId: "1:110627582997:web:8f2c04a2a7c3adb8b0ca1c",
      storageBucket: "sport-match-5648d.firebasestorage.app",
      apiKey: "AIzaSyDvsTP2HHart9CbG9C3mdOlwIBRyW1Dz78",
      authDomain: "sport-match-5648d.firebaseapp.com",
      messagingSenderId: "110627582997",
      measurementId: "G-2JHTBC7BFH"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())]
};
