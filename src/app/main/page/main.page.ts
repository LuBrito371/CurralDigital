/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
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

  constructor(private machoService: MachoService, private femaleService: AnimalsService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState$.subscribe(user => (this.user  = user));

    this.maleLength();
    this.femaleLength();


    console.log(this.date);
  }

  maleLength(){
    console.log(length);
  }

  femaleLength(){

  }




}
