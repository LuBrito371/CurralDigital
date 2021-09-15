/* eslint-disable no-cond-assign */
/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { AuthService } from 'src/app/core/services/auth.service';
import { Vacina } from '../models/vacina.model';

@Injectable({
  providedIn: 'root',
})
export class VacinaService extends Firestore<Vacina> {
  vacina: Vacina;

  constructor(
    private authService: AuthService,
    db: AngularFirestore
  ) {
    super(db);
    this.init();
  }

  init(): void {

    this.authService.authState$.subscribe((user) => {
      if (user) {
        const male = this.db.collection('male').doc(this.vacina.idAnimal);
        this.setCollection(`/users/${user.uid}/male/${male}/vacinas`);
        return;
      }

      this.setCollection(null);
    });
  }
}
