/* eslint-disable object-shorthand */
import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { Monta } from '../models/monta.model';
import { AnimalsService } from '../services/animals.service';
import { MontaService } from '../services/monta.service';

@Component({
  selector: 'app-morto',
  templateUrl: './morto.page.html',
  styleUrls: ['./morto.page.scss'],
})
export class MortoPage implements OnInit {
  monta$: Observable<DocumentData[]>;
  montaForm: FormGroup;
  femaleId: string = undefined;
  monta: Monta;

  constructor(
    private animalsService: AnimalsService,
    private montaService: MontaService,
    private overlayService: OverlayService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();

    this.femaleId = this.route.snapshot.paramMap.get('id');
  }

  ionViewDidEnter(): void {
    this.monta$ = this.animalsService.collection
      .doc(this.femaleId)
      .collection('montas')
      .valueChanges();
  }

  createForm(): void {
    this.montaForm = this.fb.group({
      data: ['', [Validators.required]],
      parto: [''],
      sucesso:['']
    });
  }

  async saveMonta(): Promise<void> {
    try {
      if (this.femaleId) {
        this.monta = this.montaForm.value;
        const data = new Date(this.monta.data);
        const format =
          data.getDate() +
          1 +
          '/' +
          (data.getMonth() + 1) +
          '/' +
          data.getFullYear();
        console.log(format);
        this.monta.data = format;
        this.montaService.collection = this.animalsService.collection
          .doc(this.femaleId)
          .collection('montas');
        this.montaService.create(this.monta);
        console.log(this.monta);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async onDelete(monta: DocumentData): Promise<void> {
    await this.overlayService.alert({
      message: `Tem certeza que deseja deletar esse registro de monta?`,
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            await this.animalsService.collection
              .doc(this.femaleId)
              .collection('montas')
              .doc(monta.id)
              .delete();
            await this.overlayService.toast({
              message: `"Monta deletada`,
            });
          },
        },
        'Não',
      ],
    });
  }

  onBack(femaleId): void {
    this.navCtrl.navigateBack(['main', 'edit-female', femaleId]);
  }
}
