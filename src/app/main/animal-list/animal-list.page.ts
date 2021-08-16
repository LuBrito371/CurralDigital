import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { Animal } from '../models/animal.model';
import { AnimalsService } from '../services/animals.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.page.html',
  styleUrls: ['./animal-list.page.scss'],
})
export class AnimalListPage {

  animal$: Observable<Animal[]>;

  constructor(private navCtrl: NavController, private animalsService: AnimalsService) { }

  ionViewDidEnter(): void {
    this.animal$ = this.animalsService.getAll();
  }

  onUpdate(animal: Animal): void{
    this.navCtrl.navigateForward(['main', 'edit', animal.id]);
  }

}
