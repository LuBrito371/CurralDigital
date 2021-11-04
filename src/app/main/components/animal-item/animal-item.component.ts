import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Animal } from '../../models/animal.model';

@Component({
  selector: 'app-animal-item',
  templateUrl: './animal-item.component.html',
  styleUrls: ['./animal-item.component.scss'],
})
export class AnimalItemComponent  {
  @Input() animal: Animal;
  @Output() update = new EventEmitter<Animal>();
  @Output() delete = new EventEmitter<Animal>();


}
