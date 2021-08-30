/* eslint-disable max-len */
import { Component, Input, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from './core/services/auth.service';
import { OverlayService } from './core/services/overlay.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  @Input() menu: string;

  pages: [];
  user: firebase.User;
  constructor(private authService: AuthService, private menuCtrl: MenuController, private overlayService: OverlayService, private navCtrl: NavController) {
    this.initializeApp();
  }

  async ngOnInit(): Promise<void>{
    if(!(await this.menuCtrl.isEnabled(this.menu))){
      this.menuCtrl.enable(true, this.menu);
    }
  }

  initializeApp() {
    this.authService.authState$.subscribe(user  => (this.user = user));
  }

  async logout(): Promise<void>{
    await this.overlayService.alert({
      message: 'Você realmente deseja sair?',
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            await this.authService.logOut();
            await this.menuCtrl.enable(false, this.menu);
            this.navCtrl.navigateRoot('/home');
          }
        },

        'Não'
      ]
    });
  }
}
