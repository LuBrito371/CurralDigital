/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthProvider } from 'src/app/core/services/auth.types';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  authProviders = AuthProvider;
  authForm: FormGroup;
  configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Cadastrar'
  };
  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(private authService: AuthService, private fb: FormBuilder, private navCtrl: NavController,
    private route: ActivatedRoute, private overlayService: OverlayService) { }

  ngOnInit(): void {
    this.createForm();
  }


  private createForm(): void{
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get name(): FormControl{
    return <FormControl> this.authForm.get('name');
  }

  get email(): FormControl{
    return <FormControl> this.authForm.get('email');
  }

  get password(): FormControl{
    return <FormControl> this.authForm.get('password');
  }

  changeAuthAction(): void {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Login' : 'Cadastrar';
    this.configs.actionChange = isSignIn ? 'Cadastrar-se' : 'Já tenho uma conta';
    !isSignIn
      ? this.authForm.addControl('name', this.nameControl)
      : this.authForm.removeControl('name');
  }

  async onSubmit(provider: AuthProvider): Promise<void>{
    const loading = await this.overlayService.loading();
    try {
      const credentials = await this.authService.authenticate({
        isSignIn: this.configs.isSignIn,
        user: this.authForm.value,
        provider
      });
      console.log(credentials.user.uid);
      this.navCtrl.navigateForward(this.route.snapshot.queryParamMap.get('redirect') || '/main');
    } catch (error) {
      console.log('Erro de Autenticação: ', error);
      await this.overlayService.toast({
        message: 'Email ou senha inválidos'
      });
    } finally{
      loading.dismiss();
    }
  }

}
