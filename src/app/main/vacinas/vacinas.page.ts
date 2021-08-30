/* eslint-disable object-shorthand */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-vacinas',
  templateUrl: './vacinas.page.html',
  styleUrls: ['./vacinas.page.scss'],
})
export class VacinasPage implements OnInit {

  constructor(private modelCtrl: ModalController) { }

  ngOnInit() {
  }

  submit(awesome){
    this.modelCtrl.dismiss({awesome: awesome});
  }

}
