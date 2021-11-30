/* eslint-disable @typescript-eslint/no-shadow */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Monta } from '../../models/monta.model';
import { AnimalsService } from '../../services/animals.service';

@Component({
  selector: 'app-monta-item',
  templateUrl: './monta-item.component.html',
  styleUrls: ['./monta-item.component.scss'],
})
export class MontaItemComponent implements OnInit {
  @Input() monta: DocumentData;
  @Output() delete = new EventEmitter<DocumentData>();
  @Output() update = new EventEmitter<DocumentData>();

  partoForm: FormGroup;
  femaleId: string = undefined;
  data: Monta;
  parto: string;
  sucesso: string;

  constructor(
    private animalsService: AnimalsService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();

    this.femaleId = this.route.snapshot.paramMap.get('id');

    this.partoData();
  }

  partoData(): void {
    if (this.monta.id) {
      this.animalsService.collection
        .doc(this.femaleId)
        .collection('montas')
        .doc(this.monta.id)
        .get()
        .subscribe((x) => {
          this.parto = x.get('parto');
          this.sucesso = x.get('sucesso');
        });
    }
  }

  createForm(): void {
    this.partoForm = this.fb.group({
      parto: ['',  [Validators.required]],
      sucesso: [''],
    });
  }

  async save(): Promise<void>{
    try {
      if(this.femaleId){
        this.data = this.partoForm.value;

        this.animalsService.collection
          .doc(this.femaleId)
          .collection('montas')
          .doc(this.monta.id)
          .update({ sucesso: this.data.sucesso });

        }
        console.log(this.monta);
    } catch (error) {

    }
  }

  async saveParto(): Promise<void> {
    try {
      if (this.femaleId) {
        this.data = this.partoForm.value;
          const data = new Date(this.data.parto);
          const format =
            data.getDate() +
            1 +
            '/' +
            (data.getMonth() + 1) +
            '/' +
            data.getFullYear();
          console.log(format);
          this.data.parto = format;

          this.animalsService.collection
            .doc(this.femaleId)
            .collection('montas')
            .doc(this.monta.id)
            .update({ parto: this.data.parto });


      }
      console.log(this.monta);
    } catch (error) {
      console.error(error);
    }
  }
}
