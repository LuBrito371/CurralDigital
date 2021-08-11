import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Firestore } from 'src/app/core/classes/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import { Vaca } from '../animal-model/vaca.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalService extends Firestore<Vaca> {

  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
   }

  private init(): void{
    this.authService.authState$.subscribe(user => {
      if(user){
        this.setCollection(`/users/${user.uid}/tasks`);
        return;
      }
      this.setCollection(null);
    });
  }
}
