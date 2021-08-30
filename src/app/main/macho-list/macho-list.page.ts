import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { Male } from '../models/macho.model';
import { MachoService } from '../services/macho.service';

@Component({
  selector: 'app-macho-list',
  templateUrl: './macho-list.page.html',
  styleUrls: ['./macho-list.page.scss'],
})
export class MachoListPage {

  animal$: Observable<Male[]>;

  constructor(private navCtrl: NavController, private overlayService: OverlayService, private machoService: MachoService) { }

  ionViewDidEnter(): void {
    this.animal$ = this.machoService.getAll();
  }

  onUpdate(animal: Male): void{
    this.navCtrl.navigateForward(['main', 'edit-male', animal.id]);
  }

  async onDelete(animal: Male): Promise<void>{
    await this.overlayService.alert({
      message: `Tem certeza que deseja deletar "${animal.brinco}"?`,
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            await this.machoService.delete(animal);
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
