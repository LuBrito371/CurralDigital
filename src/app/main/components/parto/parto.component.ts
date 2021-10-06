import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Monta } from '../../models/monta.model';

@Component({
  selector: 'app-partos',
  templateUrl: './parto.component.html',
  styleUrls: ['./parto.component.scss'],
})
export class PartoComponent  {
  @Input() parto: Monta;
  @Output() update = new EventEmitter<Monta>();
  @Output() delete = new EventEmitter<Monta>();


}
