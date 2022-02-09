/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AnimalsService } from '../services/animals.service';
import { MachoService } from '../services/macho.service';

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
  mamandoF: number;
  desmamado: number;
  desmamadoF: number;
  prenhes: number;
  cobertura: number;
  aptas: number;
  concepcao = 0;
  desmame = 0;
  prenhez = 0;
  servico = 0;

  constructor(
    private machoService: MachoService,
    private femaleService: AnimalsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.authState$.subscribe((user) => (this.user = user));


  }

  ionViewWillEnter() {
    this.maleLength();
    this.femaleLength();
    this.bezerrosLength();
    this.montaLength();
    this.aptasLength();
    this.taxaServico();
    this.taxaConcepcao();
    this.taxaPrenhez();
    this.taxaDesmame();

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

  aptasLength() {
    if (this.females !== 0) {
      this.aptas = this.females - (this.prenhes + this.mamandoF + this.cobertura);
    } else {
      this.aptas = 0;
    }
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
        if (n[i].apartação !== '') {
          contFD++;
        }
      }

      this.mamando = contMM;
      this.mamandoF = contFM;
      this.desmamado = contMD;
      this.desmamadoF = contFD;
    });
  }

  montaLength() {
    let contC = 0;
let contP = 0;
    this.femaleService.collection.ref.get().then((docs) => {
      docs.forEach((doc) => {
        const id = doc.id;
        this.femaleService.collection
          .doc(id)
          .collection('montas')
          .valueChanges()
          .subscribe((x) => {
            if (x.length > 0) {
              this.desmamadoF--;
              for (let i = 0; i < x.length; i++) {
                if (x[i].sucesso === 'Sim' && x[i].parto === '') {
                  contP++;
                }
                if(x[i].sucesso === ''){
                  contC++;
                }
              }
            }
            this.prenhes = contP;
            this.cobertura = contC;
          });
      });
    });
  }

  taxaServico(){
    let taxa;
    const desmame = this.cobertura;
    if (this.aptas > 0) {
      const decimal = Math.round(desmame * 100) / this.aptas;
      taxa = decimal.toFixed(1);
      this.servico = taxa;
    }
  }

  taxaDesmame() {
    let taxa;
    const desmame = this.desmamado + this.desmamadoF;
    if (this.cobertura > 0) {
      const decimal = Math.round(desmame * 100) / this.cobertura;
      taxa = decimal.toFixed(1);
      this.desmame = taxa;
    }
  }

  taxaConcepcao() {
    let taxa;
    if (this.cobertura > 0) {
      const decimal = Math.round(this.prenhes * 100) / this.cobertura;
      taxa = decimal.toFixed(1);
      this.concepcao = taxa;
    }
  }

  taxaPrenhez() {
    let taxa;
    if (this.aptas > 0) {
      const decimal = Math.round(this.prenhes * 100) / this.aptas;
      taxa = decimal.toFixed(1);

      this.prenhez = taxa;
    }
  }
}
