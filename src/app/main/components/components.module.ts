import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { AnimalItemComponent } from './animal-item/animal-item.component';
import { MontaComponent } from './monta/monta.component';
import { PartoComponent } from './parto/parto.component';
import { PesoComponent } from './peso/peso.component';
import { VacinaComponent } from './vacina/vacina.component';



@NgModule({
  declarations: [AnimalItemComponent, VacinaComponent, MontaComponent, PartoComponent, PesoComponent],
  imports: [
    SharedModule
  ],
  exports: [AnimalItemComponent, VacinaComponent, MontaComponent, PartoComponent, PesoComponent]
})
export class ComponentsModule { }
