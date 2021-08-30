/* eslint-disable object-shorthand */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-monta-parto',
  templateUrl: './monta-parto.page.html',
  styleUrls: ['./monta-parto.page.scss'],
})
export class MontaPartoPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  submit(awesome){
    this.modalCtrl.dismiss({awesome: awesome});
  }
}
