import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { AnimalItemComponent } from './animal-item/animal-item.component';
import { VacinaComponent } from './vacina/vacina.component';



@NgModule({
  declarations: [AnimalItemComponent, VacinaComponent],
  imports: [
    SharedModule
  ],
  exports: [AnimalItemComponent, VacinaComponent]
})
export class ComponentsModule { }
