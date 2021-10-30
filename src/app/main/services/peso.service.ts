import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { Pesagem } from '../models/pesagem.model';

@Injectable({
  providedIn: 'root'
})
export class PesoService extends Firestore<Pesagem>{

  constructor(db: AngularFirestore) {
    super(db);
  }
}
