/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable object-shorthand */
import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { Male } from '../models/macho.model';
import { Vacina } from '../models/vacina.model';
import { MachoService } from '../services/macho.service';
import { VacinaService } from '../services/vacina.service';

@Component({
  selector: 'app-vacinas',
  templateUrl: './vacinas.page.html',
  styleUrls: ['./vacinas.page.scss'],
})
export class VacinasPage implements OnInit{
  vacina$: Observable<DocumentData[]>;
  vacinaForm: FormGroup;
  maleId: string = undefined;
  vacina: Vacina;

  constructor(
    public modalCtrl: ModalController,
    private machoService: MachoService,
    private vacinaService: VacinaService,
    private overlayService: OverlayService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private fb: FormBuilder
  ) {}

  ngOnInit(){
    this.createForm();

    this.maleId = this.route.snapshot.paramMap.get('id');
  }

  ionViewDidEnter(): void {
    this.vacina$ = this.machoService.collection.doc(this.maleId).collection('vacinas').valueChanges();

  }

  createForm(): void {
    this.vacinaForm = this.fb.group({
      nome: ['', [Validators.required]],
      data: ['', [Validators.required]],
    });
  }

  async saveVacina(): Promise<void> {
    try {

      if(this.maleId){
        this.vacina = this.vacinaForm.value;
      this.vacinaService.collection = this.machoService.collection.doc(this.maleId).collection('vacinas');
       this.vacinaService.create(this.vacina);
        console.log(this.vacina);

      }


    } catch (error) {
      console.error(error);
    }
  }

  async onDelete(vacina: DocumentData): Promise<void>{
    await this.overlayService.alert({
      message: `Tem certeza que deseja deletar o registro da vacina "${vacina.nome}"?`,
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            await this.machoService.collection.doc(this.maleId).collection('vacinas').doc(vacina.id).delete();
            await this.overlayService.toast({
              message: `"${vacina.nome}" deletado`
            });
          }
        },
        'Não'
      ]
    });

  }



  onBack(maleId): void {
    this.navCtrl.navigateBack(['main', 'edit-male', maleId]);
  }


}
