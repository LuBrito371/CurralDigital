import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vaca } from '../animal-model/vaca.model';

@Component({
  selector: 'app-animal-item',
  templateUrl: './animal-item.component.html',
  styleUrls: ['./animal-item.component.scss'],
})
export class AnimalItemComponent  {

  @Input() animal: Vaca;
  @Output() update = new EventEmitter<Vaca>();
  @Output() delete = new EventEmitter<Vaca>();


}
