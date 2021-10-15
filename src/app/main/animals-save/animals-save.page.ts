/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { AnimalsService } from '../services/animals.service';
import { VacinasPage } from '../vacinas/vacinas.page';

@Component({
  selector: 'app-animals-save',
  templateUrl: './animals-save.page.html',
  styleUrls: ['./animals-save.page.scss'],
})
export class AnimalsSavePage implements OnInit {
  animalForm: FormGroup;
  pageTitle = '...';
  animalId: string = undefined;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private overlayService: OverlayService,
    private route: ActivatedRoute,
    private animalsService: AnimalsService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.init();
  }
  init(): void {
    const animalId = this.route.snapshot.paramMap.get('id');
    if (!animalId) {
      this.pageTitle = 'Novo Animal';
      return;
    }
    this.animalId = animalId;
    this.pageTitle = 'Editar Dados';
    this.animalsService
      .get(animalId)
      .pipe(take(1))
      .subscribe(({ brinco, peso, nascimento, apartação }) => {
        this.animalForm.get('brinco').setValue(brinco);
        this.animalForm.get('peso').setValue(peso);
        this.animalForm.get('nascimento').setValue(nascimento);
        this.animalForm.get('apartação').setValue(apartação);
      });
  }

  private createForm(): void {
    this.animalForm = this.fb.group({
      brinco: ['', [Validators.required, Validators.minLength(3)]],
      peso: ['', [Validators.required, Validators.min(0)]],
      nascimento: ['', [Validators.required]],
      apartação: [''],
    });
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Salvando..',
    });
    try {
      const animal = !this.animalId
        ? await this.animalsService.create(this.animalForm.value)
        : await this.animalsService.update({
            id: this.animalId,
            ...this.animalForm.value,
          });
      console.log(animal);
      this.navCtrl.navigateBack('/main/female-list');
    } catch (error) {
      console.log('Erro salvando animal ', error);
      await this.overlayService.toast({
        message: error.message,
      });
    } finally {
      loading.dismiss();
    }
  }

  onVacina(animalId): void{
    this.navCtrl.navigateForward(['main', 'edit-female', animalId, 'vacinas-femea']);
  }

  onMontas(animalId): void{
    this.navCtrl.navigateForward(['main', 'edit-female', animalId, 'monta']);
  }

  onPartos(animalId): void{
    this.navCtrl.navigateForward(['main', 'edit-female', animalId, 'parto']);
  }
}
