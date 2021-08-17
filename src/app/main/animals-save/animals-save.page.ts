/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { AnimalsService } from '../services/animals.service';

@Component({
  selector: 'app-animals-save',
  templateUrl: './animals-save.page.html',
  styleUrls: ['./animals-save.page.scss'],
})
export class AnimalsSavePage implements OnInit {
  animalForm: FormGroup;
  pageTitle = '...';
  animalId: string = undefined;

  constructor(private fb: FormBuilder, private navCtrl: NavController, private overlayService: OverlayService, private route: ActivatedRoute, private animalsService: AnimalsService) { }

  ngOnInit(): void {
    this.createForm();
    this.init();
  }
   init(): void{
     const animalId = this.route.snapshot.paramMap.get('id');
     if(!animalId){
      this.pageTitle = 'Novo Animal';
      return;
     }
     this.animalId = animalId;
     this.pageTitle = 'Editar Dados';
     this.animalsService
      .get(animalId)
      .pipe(take(1))
      .subscribe(({ brinco, peso, meses, bezerros, cio})=>{
        this.animalForm.get('brinco').setValue(brinco);
        this.animalForm.get('peso').setValue(peso);
        this.animalForm.get('meses').setValue(meses);
        this.animalForm.get('bezerros').setValue(bezerros);
        this.animalForm.get('cio').setValue(cio);
      });
   }

  private createForm(): void{
    this.animalForm = this.fb.group({
      brinco: ['',[Validators.required, Validators.minLength(3)]],
      peso: ['', [Validators.required, Validators.min(0)]],
      meses: ['', [Validators.required, Validators.min(0)]],
      bezerros: ['', [Validators.required, Validators.min(0)]],
      cio: [false],
    });
  }

  async onSubmit(): Promise<void>{
    const loading = await this.overlayService.loading({
      message: 'Salvando..'
    });
    try {
      const animal = !this.animalId
      ? await this.animalsService.create(this.animalForm.value)
      : await this.animalsService.update({
        id: this.animalId,
        ...this.animalForm.value
      });
      this.navCtrl.navigateBack('/main/animal-list');
    } catch (error) {
      console.log('Erro salvando animal ', error);
      await this.overlayService.toast({
        message: error.message
      });
    } finally{
      loading.dismiss();
    }
  }

}
