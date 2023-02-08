import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseWorkerService } from 'src/app/sharedServices/firebase-worker.service';
import { AccountServiceService } from '../account-service.service';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  user!: User;
  sub!: Subscription;
  constructor(
    private firebaseWorker: FirebaseWorkerService,
    private accountService: AccountServiceService,
    private router: Router
  ) {
    this.sub = new Subscription();
  }
  ngOnInit(): void {}
  onFormSubmit(form: NgForm) {
    this.firebaseWorker
      .signIn(form.value.email, form.value.password)
      .then((result) => {
        console.log('sign in was called');
      });
  }
  ngOnDestroy(): void {}
}
