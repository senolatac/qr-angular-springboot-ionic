import { Component, OnInit } from '@angular/core';
import{AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import * as Stomp from "stompjs";
import * as SockJS from "sockjs-client";

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {
  qrCodeValue: string = "default";
  stompClient: any = null;
  sessionId: string = null;
  SOCKET_URL = "http://localhost:8080/socket";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.disconnect();
    this.connect();
  }

  connect(){
    var socket = new SockJS(this.SOCKET_URL);
    this.stompClient = Stomp.over(socket);
    let that = this;
    this.stompClient.connect({}, function(frame){
      that.sessionId = /\/([^\/]+)\/websocket/.exec(socket._transport.url)[1];
      that.qrCodeValue = that.sessionId;
      that.stompClient.subscribe('/queue/messages-'+ that.sessionId,
      function(outputMessage){
        that.mobileAuthentication(JSON.parse(outputMessage.body));
        that.disconnect();
      });
    });
  }

  mobileAuthentication(outputMessage){
    this.authService.qrLogin(outputMessage.user).subscribe(data => {
      this.router.navigate(['/profile']);
    });
  }

  disconnect(){
    if(this.stompClient !=null){
      this.stompClient.disconnect();
    }
  }

}
