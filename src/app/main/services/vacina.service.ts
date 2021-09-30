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
    @Inject(String) id: string
  ) {
    super(db);
    this.init(id);
  }

  init(maleId: string): void {
    this.authService.authState$.subscribe(user => {
      if(user){
        this.machoService.get(maleId).subscribe(male =>{
          this.setCollection(`/users/${user.uid}/male/${male.id}/vacinas/`);
        });
      }
    });

  }

  /*list() {
   console.log(this.getAll());
    /*.get()
    .then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
      });
    });
  }*/
}
