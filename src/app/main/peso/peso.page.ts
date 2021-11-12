import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { Pesagem } from '../models/pesagem.model';
import { MachoService } from '../services/macho.service';
import { PesoService } from '../services/peso.service';
import { VacinaService } from '../services/vacina.service';

@Component({
  selector: 'app-peso',
  templateUrl: './peso.page.html',
  styleUrls: ['./peso.page.scss'],
})
export class PesoPage implements OnInit {

  peso$: Observable<DocumentData[]>;
  pesoForm: FormGroup;
  maleId: string = undefined;
  peso: Pesagem;

  constructor(
    private machoService: MachoService,
    private pesoService: PesoService,
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
    this.peso$ = this.machoService.collection.doc(this.maleId).collection('peso').valueChanges();

  }

  createForm(): void {
    this.pesoForm = this.fb.group({
      peso: ['', [Validators.required]],
      data: ['', [Validators.required]],
    });
  }

  async savePeso(): Promise<void> {
    try {

      if(this.maleId){

        this.peso = this.pesoForm.value;
        const data = new Date(this.peso.data);
        const format = ((data.getDate()+1 )) + '/' + ((data.getMonth() +1)) + '/' + data.getFullYear();
        console.log(format);
        this.peso.data = format;


      this.pesoService.collection = this.machoService.collection.doc(this.maleId).collection('peso');
       this.pesoService.create(this.peso);
        console.log(this.peso);

      }


    } catch (error) {
      console.error(error);
    }
  }

  async onDelete(peso: DocumentData): Promise<void>{
    await this.overlayService.alert({
      message: `Tem certeza que deseja deletar o registro de pesagem do dia "${peso.data}"?`,
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            await this.machoService.collection.doc(this.maleId).collection('peso').doc(peso.id).delete();
            await this.overlayService.toast({
              message: `Pesagem deletada.`
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
