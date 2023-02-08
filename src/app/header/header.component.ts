import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  checkDisplay() {
    if (this.router.url.substring(0,5) == '/view' && this.router.url.length < 7) {
      return true;
    } else if(this.router.url.substring(0,6) == '/view?') {
      return true;
    }else{
      return false
    }
  }
}
