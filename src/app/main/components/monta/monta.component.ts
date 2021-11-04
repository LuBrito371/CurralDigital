import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Monta } from '../../models/monta.model';

@Component({
  selector: 'app-montas',
  templateUrl: './monta.component.html',
  styleUrls: ['./monta.component.scss'],
})
export class MontaComponent  {

  @Input() monta: DocumentData;
  @Output() update = new EventEmitter<DocumentData>();
  @Output() delete = new EventEmitter<DocumentData>();
}
