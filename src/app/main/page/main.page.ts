/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AnimalsService } from '../services/animals.service';
import { MachoService } from '../services/macho.service';
import { MontaService } from '../services/monta.service';
import { PartoService } from '../services/parto.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  user: firebase.User;
  date: string = new Date().toLocaleDateString('pt-BR');
  males: number;
  females: number;
  mamando: number;
  desmamando: number;
  novilhas: number;
  prenhes: number;

  constructor(
    private machoService: MachoService,
    private femaleService: AnimalsService,
    private montaService: MontaService,
    private partoSerivce: PartoService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.authState$.subscribe((user) => (this.user = user));

    console.log(this.date);
  }

  ionViewDidEnter() {
    this.maleLength();
    this.femaleLength();
    this.bezerrosLength();
    this.length();
  }

  maleLength() {
    this.machoService.getAll().subscribe((values) => {
      this.males = values.length;
    });
  }

  femaleLength() {
    this.femaleService.getAll().subscribe((values) => {
      this.females = values.length;
    });
  }

  bezerrosLength() {
    let contMM = 0;
    let contFM = 0;
    let contMD = 0;
    let contFD = 0;

    this.machoService.getAll().subscribe((x) => {
      for (let i = 0; i < x.length; i++) {
        if (x[i].apartação === '') {
          contMM++;
        } else {
          contMD++;
        }
      }
    });

    this.femaleService.getAll().subscribe((n) => {
      for (let i = 0; i < n.length; i++) {
        if (n[i].apartação === '') {
          contFM++;
        }
        if(n[i].apartação !== '') {
          contFD++;
        }
      }

      this.mamando = contFM + contMM;
      this.desmamando = contFD + contMD;
    });
  }

  length(){
    let id;
    this.femaleService.collection.ref.limit(1).get().then(snap=>{
      snap.forEach(doc => {
       id = doc.id;
       this.femaleService.collection.doc(id).collection('montas').valueChanges().subscribe(x =>{
         console.log('novilhas: ',x);
       });
      });
    });
  }
}
