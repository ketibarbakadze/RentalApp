import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseWorkerService } from 'src/app/sharedServices/firebase-worker.service';
import { AccountServiceService } from '../account-service.service';
import { User } from '../user.model';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent implements OnInit {
  user: User = new User('1', '', '', true, '', '', '', '', '', '',[]);
  changeDetails: boolean = false;
  constructor(
    private accountService: AccountServiceService,
    private firebaseWorker: FirebaseWorkerService,
    private router: Router
  ) {}
  userDetailForm!: FormGroup;
  ngOnInit(): void {
    if (localStorage.getItem('user') === null) {
      localStorage.setItem(
        'user',
        JSON.stringify(new User('1', '', '', true, '', '', '', '', '', '',[]))
      );
      this.user = JSON.parse(<string>localStorage.getItem('user'));
    } else {
      this.user = JSON.parse(<string>localStorage.getItem('user'));
    }
    this.userDetailForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      lastName: new FormControl(this.user.lastName, [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      country: new FormControl(this.user.country, [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      city: new FormControl(this.user.city, [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      card: new FormControl(this.user.cardType),
      cardNumber: new FormGroup({
        visa: new FormControl(this.user.cardNumber, [
          Validators.maxLength(20),
          Validators.pattern(
            `[0-9][0-9][0-9][0-9]+-[0-9][0-9][0-9][0-9]+-[0-9][0-9][0-9][0-9]+-[0-9][0-9][0-9][0-9]`
          ),
        ]),
        masterCard: new FormControl(this.user.cardNumber, [
          Validators.maxLength(20),
          Validators.pattern(
            '[0-9][0-9][0-9][0-9]+-[0-9][0-9][0-9][0-9]+-[0-9][0-9][0-9][0-9]+-[0-9][0-9][0-9][0-9]'
          ),
        ]),
        americanExpress: new FormControl(this.user.cardNumber, [
          Validators.maxLength(20),
          Validators.pattern(
            '[0-9][0-9][0-9][0-9]+-[0-9][0-9][0-9][0-9]+-[0-9][0-9][0-9][0-9]+-[0-9][0-9][0-9][0-9]'
          ),
        ]),
      }),
    });
  }
  onSubmit() {
    let tempUser = new User(
      this.user.id,
      this.user.email,
      this.user.password,
      true,
      this.userDetailForm.get('firstName')?.value,
      this.userDetailForm.get('lastName')?.value,
      this.userDetailForm.get('country')?.value,
      this.userDetailForm.get('city')?.value,
      this.userDetailForm.get('card')?.value,
      this.userDetailForm.get(
        `cardNumber.${this.userDetailForm.get('card')?.value}`
      )?.value,
      this.user.orders
    );
    this.firebaseWorker.update(tempUser, this.user.id);
    window.alert('account details have been changed successfully');
    this.changeDetails = false;
    localStorage.setItem('user', JSON.stringify(tempUser));
  }
  changeToggle() {
    this.changeDetails = !this.changeDetails;
  }
}
