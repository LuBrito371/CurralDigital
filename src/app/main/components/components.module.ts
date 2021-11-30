import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { AnimalItemComponent } from './animal-item/animal-item.component';
import { MontaItemComponent } from './monta-item/monta-item.component';
import { PesoComponent } from './peso/peso.component';
import { VacinaComponent } from './vacina/vacina.component';



@NgModule({
  declarations: [AnimalItemComponent, VacinaComponent, PesoComponent, MontaItemComponent],
  imports: [
    SharedModule
  ],
  exports: [AnimalItemComponent, VacinaComponent, PesoComponent, MontaItemComponent]
})
export class ComponentsModule { }
