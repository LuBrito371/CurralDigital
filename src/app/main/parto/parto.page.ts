import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { Monta } from '../models/monta.model';
import { AnimalsService } from '../services/animals.service';
import { PartoService } from '../services/parto.service';

@Component({
  selector: 'app-parto',
  templateUrl: './parto.page.html',
  styleUrls: ['./parto.page.scss'],
})
export class PartoPage implements OnInit {

 parto$: Observable<DocumentData[]>;
  partoForm: FormGroup;
  femaleId: string = undefined;
  parto: Monta;

  constructor(
    private animalsService: AnimalsService,
    private partoService: PartoService,
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
    this.parto$ = this.animalsService.collection.doc(this.femaleId).collection('partos').valueChanges();

  }

  createForm(): void {
    this.partoForm = this.fb.group({
      ordem: ['', [Validators.required]],
      data: ['', [Validators.required]],
    });
  }

  async saveParto(): Promise<void> {
    try {

      if(this.femaleId){
        this.parto = this.partoForm.value;
        const data = new Date(this.parto.data);
        const format = ((data.getDate()+1 )) + '/' + ((data.getMonth() +1)) + '/' + data.getFullYear();
        console.log(format);
        this.parto.data = format;
      this.partoService.collection = this.animalsService.collection.doc(this.femaleId).collection('partos');
       this.partoService.create(this.parto);
        console.log(this.parto);

      }


    } catch (error) {
      console.error(error);
    }
  }

  async onDelete(parto: DocumentData): Promise<void>{
    await this.overlayService.alert({
      message: `Tem certeza que deseja deletar o registro da "Parto Nº${parto.ordem}"?`,
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            await this.animalsService.collection.doc(this.femaleId).collection('partos').doc(parto.id).delete();
            await this.overlayService.toast({
              message: `"Parto Nº${parto.ordem}" deletado`
            });
          }
        },
        'Não'
      ]
    });

  }



  onBack(femaleId): void {
    this.navCtrl.navigateBack(['main', 'edit-female', femaleId]);
  }

}
