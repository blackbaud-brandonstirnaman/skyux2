import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyModule } from '../../../../src/core';

import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./alert.component.visual-fixture.html')
})
class AppComponent {
  public alertCloseable = true;
}

@NgModule({
  imports: [
    BrowserModule,
    SkyModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
class AppModule { }

Bootstrapper.bootstrapModule(AppModule);
