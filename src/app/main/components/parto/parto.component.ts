import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Monta } from '../../models/monta.model';

@Component({
  selector: 'app-partos',
  templateUrl: './parto.component.html',
  styleUrls: ['./parto.component.scss'],
})
export class PartoComponent  {
  @Input() parto: DocumentData;
  @Output() update = new EventEmitter<DocumentData>();
  @Output() delete = new EventEmitter<DocumentData>();


}
