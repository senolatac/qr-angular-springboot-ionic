import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MenuController,LoadingController } from '@ionic/angular';
import {User} from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loader : any;
  user: User = new User();
  errorMessage:string;
  isDismiss = false;

  constructor(public authService:AuthService, private menu: MenuController
  , public loadingCtrl: LoadingController,
  public router: Router) { }

  ngOnInit() {
      this.menu.enable(false);
  }

  login(){
    this.presentLoading();
    this.authService.login(this.user).subscribe(data => {
      this.dismiss();
      this.router.navigate(['/home']);
    },err =>{
      this.errorMessage ="Username or password is incorrect";
      this.dismiss();
    });
  }

  async presentLoading() {
    this.loader = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await this.loader.present().then(()=> {
      if(this.isDismiss){
        this.loader.dismiss();
      }
    });
  }

  async dismiss() {
    this.isDismiss = true;
    if(!this.loader){
      return;
    }
  return await this.loader.dismiss().then(() => console.log('dismissed'));
  }

}
