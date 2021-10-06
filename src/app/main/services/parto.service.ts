import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { Monta } from '../models/monta.model';

@Injectable({
  providedIn: 'root'
})
export class PartoService extends Firestore<Monta> {

  constructor(db: AngularFirestore) {
    super(db);
  }
}
