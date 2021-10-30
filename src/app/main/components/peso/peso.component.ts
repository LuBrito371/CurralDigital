import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pesagem } from '../../models/pesagem.model';

@Component({
  selector: 'app-pesos',
  templateUrl: './peso.component.html',
  styleUrls: ['./peso.component.scss'],
})
export class PesoComponent  {

  @Input() peso: Pesagem;
  @Output() delete = new EventEmitter<Pesagem>();
  @Output() update = new EventEmitter<Pesagem>();

}
