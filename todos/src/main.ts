import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// set ngZone to no operation because ngZone always creates some unexpected results with angular elements
// platformBrowserDynamic().bootstrapModule(AppModule, {ngZone: 'noop'})
//   .catch(err => console.error(err));
