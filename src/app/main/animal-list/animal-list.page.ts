import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { Animal } from '../models/animal.model';
import { AnimalsService } from '../services/animals.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.page.html',
  styleUrls: ['./animal-list.page.scss'],
})
export class AnimalListPage {

  animal$: Observable<Animal[]>;

  constructor(private navCtrl: NavController, private overlayService: OverlayService, private animalsService: AnimalsService) { }

  ionViewDidEnter(): void {
    this.animal$ = this.animalsService.getAll();
  }

  onUpdate(animal: Animal): void{
    this.navCtrl.navigateForward(['main', 'edit-female', animal.id]);
  }

  async onDelete(animal: Animal): Promise<void>{
    await this.overlayService.alert({
      message: `Tem certeza que deseja deletar "${animal.brinco}"?`,
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            await this.animalsService.delete(animal);
            await this.overlayService.toast({
              message: `"${animal.brinco}" deletado`
            });
          }
        },
        'Não'
      ]
    });
  }

}
