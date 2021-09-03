/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { AuthService } from 'src/app/core/services/auth.service';
import { Vacina } from '../models/vacina.model';

@Injectable({
  providedIn: 'root'
})
export class VacinaService extends Firestore<Vacina>{

  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
    this.init();
   }

   init(): void{
    this.authService.authState$.subscribe(male => {
       if(male){
         this.setCollection(`/male/${male.uid}/vacinas`);
         return;
       }
       this.setCollection(null);
     });
   }
}
