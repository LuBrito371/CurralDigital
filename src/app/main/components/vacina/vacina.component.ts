import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Vacina } from '../../models/vacina.model';

@Component({
  selector: 'app-vacina',
  templateUrl: './vacina.component.html',
  styleUrls: ['./vacina.component.scss'],
})
export class VacinaComponent  {

  @Input() vacina: DocumentData;
  @Output() update = new EventEmitter<DocumentData>();
  @Output() delete = new EventEmitter<DocumentData>();

}
