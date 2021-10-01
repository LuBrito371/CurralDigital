import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Vacina } from '../../models/vacina.model';

@Component({
  selector: 'app-vacina',
  templateUrl: './vacina.component.html',
  styleUrls: ['./vacina.component.scss'],
})
export class VacinaComponent  {

  @Input() vacina: Vacina;
  @Output() update = new EventEmitter<Vacina>();
  @Output() delete = new EventEmitter<Vacina>();

}
