/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { MachoService } from 'src/app/main/services/macho.service';
import { Male } from '../models/macho.model';
import { VacinasPage } from '../vacinas/vacinas.page';

@Component({
  selector: 'app-macho-save',
  templateUrl: './macho-save.page.html',
  styleUrls: ['./macho-save.page.scss'],
})
export class MachoSavePage implements OnInit {
  maleForm: FormGroup;
  pageTitle = '...';
  maleId: string = undefined;
  male: Male;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private route: ActivatedRoute,
    private machoService: MachoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.init();
  }
  init(): void {
    const maleId = this.route.snapshot.paramMap.get('id');
    if (!maleId) {
      this.pageTitle = 'Novo Animal';
      return;
    }
    this.maleId = maleId;
    this.pageTitle = 'Editar Dados';
    this.machoService
      .get(maleId)
      .pipe(take(1))
      .subscribe(({ brinco, pesoAtual, nascimento, apartação }) => {
        this.maleForm.get('brinco').setValue(brinco);
        this.maleForm.get('nascimento').setValue(nascimento);
        this.maleForm.get('apartação').setValue(apartação);
      });
  }

  private createForm(): void {
    this.maleForm = this.fb.group({
      brinco: ['', [Validators.required, Validators.minLength(3)]],
      nascimento: ['', [Validators.required]],
      apartação: [''],
    });
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Salvando..',
    });
    try {
      if(!this.maleId){
         this.male = await this.machoService.create(this.maleForm.value);
         this.machoService.male = this.male;
      }
      else{
        await this.machoService.update({
            id: this.maleId,
            ...this.maleForm.value,
          });
      }

      this.navCtrl.navigateBack('/main/male-list');
    } catch (error) {
      await this.overlayService.toast({
        message: error.message,
      });
    } finally {
      loading.dismiss();
    }
  }
  onVacina(maleId): void{
    this.navCtrl.navigateForward(['main', 'edit-male', maleId, 'vacinas']);
  }

  onPeso(maleId): void{
    this.navCtrl.navigateForward(['main', 'edit-male', maleId, 'pesagens']);
  }


  }
