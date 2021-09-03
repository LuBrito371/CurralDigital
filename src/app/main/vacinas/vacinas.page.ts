/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable object-shorthand */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { VacinaService } from '../services/vacina.service';

@Component({
  selector: 'app-vacinas',
  templateUrl: './vacinas.page.html',
  styleUrls: ['./vacinas.page.scss'],
})
export class VacinasPage implements OnInit {

  vacinaForm: FormGroup;

  constructor(private modelCtrl: ModalController, private fb: FormBuilder, private vacinaService: VacinaService) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void{
    this.vacinaForm = this.fb.group({
      nome: ['',[Validators.required]]
    });
  }

  async onSubmit(): Promise<void>{
    try{
      const vacina = this.vacinaService.create(this.vacinaForm.value);
      console.log('Vacina ', vacina);
    }catch(error){
      console.log('Error ', error);
    }
  }

  submit(awesome){
    this.modelCtrl.dismiss({awesome: awesome});
  }

}
