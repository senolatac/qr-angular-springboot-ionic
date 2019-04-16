import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {User} from '../model/user';
import { Router } from '@angular/router';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  userList: Array<User>;
  constructor(private authService: AuthService, private router: Router,
  private menu: MenuController) {}

  ngOnInit() {
    this.menu.enable(true);
    this.findAllUsers();
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

  findAllUsers(){
    this.authService.findAllUsers().subscribe(data => {
      this.userList = data;
    });
  }

  detail(user:User) {
    this.router.navigate(['/detail', user.id]);
    localStorage.setItem('detailUser', JSON.stringify(user));
  }
}
