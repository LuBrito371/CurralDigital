import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Pesagem } from '../../models/pesagem.model';

@Component({
  selector: 'app-pesos',
  templateUrl: './peso.component.html',
  styleUrls: ['./peso.component.scss'],
})
export class PesoComponent  {

  @Input() peso: DocumentData;
  @Output() delete = new EventEmitter<DocumentData>();
  @Output() update = new EventEmitter<DocumentData>();

}
