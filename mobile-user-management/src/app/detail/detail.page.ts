import { Component, OnInit } from '@angular/core';
import {User} from '../model/user';
import {Router, ActivatedRoute} from "@angular/router";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  userId: string;
  currentUser: User;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
  private menu: MenuController) {
     this.currentUser = JSON.parse(localStorage.getItem("detailUser"));
  }

  ngOnInit() {
    this.menu.enable(false);
    this.activatedRoute.paramMap.subscribe(params => {
      if(params.has("id")){
        this.userId = params.get("id");
      }
    });
  }

}
