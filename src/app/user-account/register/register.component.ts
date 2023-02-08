import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseWorkerService } from 'src/app/sharedServices/firebase-worker.service';
import { AccountServiceService } from '../account-service.service';
import { passwordConfirm } from '../password/passwordConfirm.directive';
import { User } from '../user.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('formDirective') formDirective: NgForm | undefined;
  registerUserForm!: FormGroup;
  constructor(
    private firebaseWorker: FirebaseWorkerService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // required;
    // pattern =
    //   '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$';
    this.registerUserForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(40),
        Validators.pattern(
          '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$'
        ),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
      ]),
      newPasswordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
      ]),
    },{
        validators: passwordConfirm,
      });
  }

  onSubmit() {
    console.log(this.registerUserForm);
    let tempUser: User = new User(
      '1',
      this.registerUserForm.get('email')?.value,
      this.registerUserForm.get('newPassword')?.value,
      true,
      '',
      '',
      '',
      '',
      '',
      '',
      []
    );
    this.firebaseWorker.signUp(tempUser).then((Response) => {
      console.log(Response);
    });
  }
}
