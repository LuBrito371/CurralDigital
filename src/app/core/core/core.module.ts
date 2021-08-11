import { NgModule } from '@angular/core';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule} from '@angular/fire/firestore';

@NgModule({
  imports: [
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  exports: [BrowserModule, IonicModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
})
export class CoreModule {}
