import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Vaca } from './animal-model/vaca.model';
import { AnimalService } from './services/animal.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.page.html',
  styleUrls: ['./animal-list.page.scss']
})
export class AnimalListPage implements OnInit {

  animals$: Observable<Vaca[]>;

  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
    this.animals$ = this.animalService.getAll();
  }

}
