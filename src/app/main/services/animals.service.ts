import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IonThumbnail } from '@ionic/angular';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { AuthService } from 'src/app/core/services/auth.service';
import { Animal } from '../models/animal.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService extends Firestore<Animal> {

  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
    this.init();
   }

   private init(): void{
     this.authService.authState$.subscribe(user => {
       if(user){
         this.setCollection(`/users/${user.uid}/animals`);
         return;
       }
       this.setCollection(null);
     });
   }

}
