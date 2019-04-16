import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {User} from '../model/user';
import {ActivatedRoute} from '@angular/router';
import {LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  sessionId: any = null;
  currentUser: User;
  loader: any;
  isDismiss = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  )
  {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('id')){
        this.sessionId = params.get('id');
        this.auth();
      }
    });
  }

  auth(){
    this.presentLoading();
    this.authService.qrLogin(this.currentUser, this.sessionId).subscribe(data =>{
      this.dismiss();
      this.presentToast("Mission is completed.");
    },err => {
      this.dismiss();
      this.presentToast("Unexpected error occurred.");
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

  async presentToast(m){
    const toast = await this.toastCtrl.create({
      message: m,
      showCloseButton: true,
      duration: 3000,
      position:'bottom'
    });
    toast.present();
  }

}
