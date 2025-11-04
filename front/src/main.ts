import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), // conserve les providers déjà définis
    importProvidersFrom(HttpClientModule) // ✅ ajoute HttpClientModule
  ]
}).catch((err) => console.error(err));