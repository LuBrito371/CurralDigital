import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { Vacina } from '../models/vacina.model';
import { AnimalsService } from '../services/animals.service';
import { MachoService } from '../services/macho.service';
import { VacinaService } from '../services/vacina.service';

@Component({
  selector: 'app-vacinas-femea',
  templateUrl: './vacinas-femea.page.html',
  styleUrls: ['./vacinas-femea.page.scss'],
})
export class VacinasFemeaPage implements OnInit {

   vacina$: Observable<DocumentData[]>;
  vacinaForm: FormGroup;
  femaleId: string = undefined;
  vacina: Vacina;

  constructor(
    public modalCtrl: ModalController,
    private animalsService: AnimalsService,
    private vacinaService: VacinaService,
    private overlayService: OverlayService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private fb: FormBuilder
  ) {}

  ngOnInit(){
    this.createForm();

    this.femaleId = this.route.snapshot.paramMap.get('id');
  }

  ionViewDidEnter(): void {
    this.vacina$ = this.animalsService.collection.doc(this.femaleId).collection('vacinas').valueChanges();

  }

  createForm(): void {
    this.vacinaForm = this.fb.group({
      nome: ['', [Validators.required]],
      data: ['', [Validators.required]],
    });
  }

  async saveVacina(): Promise<void> {
    try {

      if(this.femaleId){
        this.vacina = this.vacinaForm.value;
      this.vacinaService.collection = this.animalsService.collection.doc(this.femaleId).collection('vacinas');
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
            await this.animalsService.collection.doc(this.femaleId).collection('vacinas').doc(vacina.id).delete();
            await this.overlayService.toast({
              message: `"${vacina.nome}" deletado`
            });
          }
        },
        'Não'
      ]
    });

  }



  onBack(animalId): void {
    this.navCtrl.navigateBack(['main', 'edit-female', animalId]);
  }

}
