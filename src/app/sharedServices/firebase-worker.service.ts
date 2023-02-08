import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from '@firebase/util';
import { Subscription } from 'rxjs';
import { AccountServiceService } from '../user-account/account-service.service';
import { User } from '../user-account/user.model';
import { getAuth, updatePassword } from 'firebase/auth';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class FirebaseWorkerService implements OnDestroy {
  userData!: any;
  subSigned: Subscription = new Subscription();
  subLogged: Subscription = new Subscription();
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private accountService: AccountServiceService
  ) {}
  ngOnDestroy(): void {
    this.subSigned.unsubscribe();
  }

  signIn(email: string, password: string) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.subSigned = this.auth.authState.subscribe((user) => {
          if (user) {
          }
        });
        this.router.navigate(['']);
        this.subLogged = this.getUserDoc(result.user?.uid ?? '').subscribe(
          (user: any) => {
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('logged', JSON.stringify(true));
            this.accountService.userLogged.next(true);
            this.accountService.userUpdated.next(
              JSON.parse(<string>localStorage.getItem('user'))
            );
          }
        );
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: error,
          showConfirmButton: true,
          confirmButtonText: 'Close',
        });
      });
  }

  signUp(user: User) {
    return this.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        this.setUserDataForSignUp(result.user, user);
        setTimeout(() => {
          Swal.fire({
            icon: 'success',
            title: 'account has been successfully created',
            showConfirmButton: true,
            confirmButtonText: 'Close',
          });
          this.signIn(user.email, user.password);
        }, 1000);
        this.router.navigate(['']);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: error,
          showConfirmButton: true,
          confirmButtonText: 'Close',
        });
      });
  }
  SignOut() {
    return this.auth.signOut().then(() => {
      this.subLogged.unsubscribe();
      this.subSigned.unsubscribe();
      localStorage.removeItem('user');
      localStorage.removeItem('logged');
      this.router.navigate(['']);
    });
  }
  getUserDoc(id: string): any {
    return this.firestore.collection('users').doc(id).valueChanges();
  }
  updateFirePassword(newPassword: string) {
    let auth = getAuth();
    let currentUser = auth.currentUser;
    updatePassword(currentUser!, newPassword)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'password changed successfully',
          showConfirmButton: true,
          confirmButtonText: 'Close',
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: error,
          showConfirmButton: true,
          confirmButtonText: 'Close',
        });
      });
  }
  setUserDataForSignUp(fireUser: any, user: User) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${fireUser.uid}`
    );
    const userData: User = {
      id: fireUser.uid,
      email: user.email,
      password: user.password,
      verifiedUser: true,
      firstName: user.firstName,
      lastName: user.lastName,
      country: user.country,
      city: user.city,
      cardType: user.cardType,
      cardNumber: user.cardNumber,
      orders: [],
    } as User;
    return userRef.set(userData, {
      merge: true,
    });
  }
  update(user: User, id: string) {
    return this.firestore
      .collection('users')
      .doc(user.id)
      .update(Object.assign({}, user));
  }
}
