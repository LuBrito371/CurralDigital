import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { AuthService } from 'src/app/core/services/auth.service';
import { Male } from '../models/macho.model';

@Injectable({
  providedIn: 'root'
})
export class MachoService extends Firestore<Male>{
constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
    this.init();
   }

   private init(): void{
     this.authService.authState$.subscribe(user => {
       if(user){
         this.setCollection(`/users/${user.uid}/male/`, (ref: firestore.CollectionReference) => ref.orderBy('brinco', 'asc'));
         return;
       }
       this.setCollection(null);
     });
   }
}
