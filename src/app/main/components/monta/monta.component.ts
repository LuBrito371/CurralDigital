import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Monta } from '../../models/monta.model';

@Component({
  selector: 'app-montas',
  templateUrl: './monta.component.html',
  styleUrls: ['./monta.component.scss'],
})
export class MontaComponent  {

  @Input() monta: Monta;
  @Output() update = new EventEmitter<Monta>();
  @Output() delete = new EventEmitter<Monta>();
}
