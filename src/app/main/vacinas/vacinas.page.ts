/* eslint-disable max-len */
/* eslint-disable object-shorthand */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { Vacina } from '../models/vacina.model';
import { VacinaService } from '../services/vacina.service';

@Component({
  selector: 'app-vacinas',
  templateUrl: './vacinas.page.html',
  styleUrls: ['./vacinas.page.scss'],
})
export class VacinasPage implements OnInit{
  vacina$: Observable<Vacina[]>;
  vacinaForm: FormGroup;
  maleId: string = undefined;
  vacina: Vacina;

  constructor(
    public modalCtrl: ModalController,
    private vacinaService: VacinaService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private fb: FormBuilder
  ) {}

  ngOnInit(){
    this.createForm();
  }

  ionViewDidEnter(): void {

    this.vacina$ = of([
      {id: 'sfhsfhs', idAnimal: 'hgss', nome: 'gfhs', data: '2021-04-34'}
    ]);
  }

  createForm(): void {
    this.vacinaForm = this.fb.group({
      nome: ['', [Validators.required]],
      data: ['', [Validators.required]],
    });
  }

  async saveVacina(): Promise<void> {
    const maleId = this.route.snapshot.paramMap.get('id');
    try {

      if(maleId){
        this.vacina = this.vacinaForm.value;
        this.vacinaService.init(maleId);
        this.vacinaService.create(this.vacina);
        console.log(this.vacina);
      }


    } catch (error) {
      console.error(error);
    }
  }



  onBack(maleId): void {
    this.navCtrl.navigateBack(['main', 'edit-male', maleId]);
  }


}
