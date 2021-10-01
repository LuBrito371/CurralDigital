/* eslint-disable no-cond-assign */
/* eslint-disable max-len */
import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { AuthService } from 'src/app/core/services/auth.service';
import { Male } from '../models/macho.model';
import { Vacina } from '../models/vacina.model';
import { MachoService } from './macho.service';

@Injectable({
  providedIn: 'root',
})
export class VacinaService extends Firestore<Vacina> {

   //maleId = this.db.collection('male').ref.doc().id;

  constructor(
    private authService: AuthService,
    private machoService: MachoService,
    private route: ActivatedRoute,
    db: AngularFirestore,

  ) {
    super(db);
    //this.init();
  }

  /*init(): void {
    this.authService.authState$.subscribe(user => {
      if(user){
          this.setCollection(`/users/${user.uid}/male/${this.male.id}/vacinas`);
      }
    });

  }*/


}
