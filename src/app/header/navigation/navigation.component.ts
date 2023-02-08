import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseWorkerService } from 'src/app/sharedServices/firebase-worker.service';
import { AccountServiceService } from 'src/app/user-account/account-service.service';
import { User } from 'src/app/user-account/user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  logged!: boolean;
  sub!: Subscription;
  constructor(
    private router: Router,
    private accountService: AccountServiceService,
    private firebaseWorker: FirebaseWorkerService
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('logged') === null) {
      this.logged = false;
    } else {
      this.logged = JSON.parse(<string>localStorage.getItem('logged'));
    }
    this.sub = this.accountService.userLogged.subscribe((response) => {
      this.logged = response;
    });
  }
  
  
 
  SignOut() {
    this.firebaseWorker.SignOut();
    this.accountService.userLogged.next(false);
    this.router.navigate(['']);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
