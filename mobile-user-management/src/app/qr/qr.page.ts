import { Component, OnInit } from '@angular/core';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  constructor(
    private qrScanner: QRScanner,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.qrscanner();
  }

  qrscanner(){
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if(status.authorized){
        let scanSub = this.qrScanner.scan().subscribe((text: string)=>{
          this.qrScanner.hide();
          scanSub.unsubscribe();
          this.router.navigateByUrl('/result/'+ text);
        });
        this.qrScanner.resumePreview();
        this.qrScanner.show().then((data: QRScannerStatus)=> {

        },err => {
          this.showAlert("Unexpected error occurred.");
        });
      }else if(status.denied){
        this.showAlert("Permission is denied.");
      }else{
        this.showAlert("Unexpected error occurred.");
      }
    });
  }

  async showAlert(m){
    let alert = await this.alertController.create({
      header: "Error",
      message: m,
      buttons: ["OK"]
    });
    await alert.present();
  }

}
