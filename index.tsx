
import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';

import { AppComponent } from './src/app.component';
import { APP_ROUTES } from './src/app.routes';

// Load external stylesheets
const loadExternalStyles = () => {
  // Tailwind CSS
  const tailwindScript = document.createElement('script');
  tailwindScript.src = 'https://cdn.tailwindcss.com';
  document.head.appendChild(tailwindScript);

  // Font Awesome
  const fontAwesome = document.createElement('link');
  fontAwesome.rel = 'stylesheet';
  fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
  document.head.appendChild(fontAwesome);

  // Google Fonts
  const googleFonts = document.createElement('link');
  googleFonts.rel = 'stylesheet';
  googleFonts.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap';
  document.head.appendChild(googleFonts);

  // Global styles
  const globalStyles = document.createElement('style');
  globalStyles.textContent = `
    :root {
      --bg-dark: #0d0d1a;
      --bg-card: #1a1a2e;
      --primary-accent: #e02f6b;
      --secondary-accent: #00c4ff;
      --text-light: #e0e0e0;
      --text-medium: #a0a0c0;
      --text-dark: #1a1a2e;
      --gradient: linear-gradient(135deg, var(--primary-accent), var(--secondary-accent));
    }
    body {
      font-family: 'Poppins', sans-serif;
      background: var(--bg-dark);
      color: var(--text-light);
      line-height: 1.6;
    }
  `;
  document.head.appendChild(globalStyles);
};

loadExternalStyles();

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(APP_ROUTES, withHashLocation())
  ]
}).catch(err => console.error(err));

// AI Studio always uses an `index.tsx` file for all project types.
