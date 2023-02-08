import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseWorkerService } from 'src/app/sharedServices/firebase-worker.service';
import { User } from 'src/app/user-account/user.model';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  @Input() payOnDay!: number;
  @Input() maxGuestCount: number = 0;
  @Input() startDate!: Date;
  @Input() endDate!: Date;
  @Input() childPolicy!: boolean;
  testArr!: any;
  value!: number;
  dateSelection: boolean = false;
  minDate: Date = new Date();
  reserveDetailForm!: FormGroup;
  paramsId!: string;
  totalPrice!: number;
  user!: User;
  paymentsObj!: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fireStore: FirebaseWorkerService
  ) {}

  ngOnInit(): void {
    if (this.childPolicy) {
      this.testArr = [
        ['adults', '13+'],
        ['children', '3-13'],
        ['infants', 'Under 2'],
        ['pets', 'service animal?'],
      ];
    } else {
      this.testArr = [
        ['adults', '13+'],
        ['pets', 'service animal?'],
      ];
    }
    this.route.params.subscribe((params) => (this.paramsId = params['id']));
    this.reserveDetailForm = new FormGroup({
      range: new FormGroup({
        start: new FormControl(this.startDate),
        end: new FormControl(this.endDate),
      }),
      adults: new FormControl(1),
      children: new FormControl(0),
      infants: new FormControl(0),
      pets: new FormControl(0),
      price: new FormControl(this.totalPrice),
    });
    if (JSON.parse(<string>localStorage.getItem('logged')) == true) {
      this.user = JSON.parse(<string>localStorage.getItem('user'));
    }
  }

  onSubmit() {
    if (JSON.parse(<string>localStorage.getItem('logged')) == true) {
      this.setTimeInLocalStorage();
      let formValue = this.reserveDetailForm.value;
      formValue.id = Date.now();
      formValue.hotelId = this.paramsId;
      formValue.pending = true;
      let jsonStr = JSON.stringify(formValue, (key, value) => {
        if (value !== null && value !== 'Any') {
          return value;
        }
      });

      localStorage.setItem('payments', jsonStr);
      this.paymentsObj = JSON.parse(localStorage.getItem('payments')!);
      let tempUser = new User(
        this.user.id,
        this.user.email,
        this.user.password,
        true,
        this.user.firstName,
        this.user.lastName,
        this.user.country,
        this.user.city,
        this.user.cardType,
        this.user.cardNumber,
        [...this.user.orders, this.paymentsObj]
      );
      this.fireStore.update(tempUser, this.user.id);
      localStorage.setItem('user', JSON.stringify(tempUser));
      this.router.navigate([`/payments/${formValue.id}`]);
    } else {
      this.router.navigate(['login']);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.reserveDetailForm != null) {
      this.reserveDetailForm
        .get('range')
        ?.get('start')
        ?.setValue(changes['startDate'].currentValue);
      this.reserveDetailForm
        .get('range')
        ?.get('end')
        ?.setValue(changes['endDate'].currentValue);
    }
  }
  
  getRange(start: any, end: any) {
    let range =
      ((start.getTime() - end.getTime()) / (1000 * 3600 * 24)) * -1 + 1;
    this.reserveDetailForm.controls['price'].setValue(
      range * this.payOnDay + 163
    );
    return Math.ceil(range);
  }

  setTimeInLocalStorage() {
    let now: any = new Date().getTime();
    localStorage.setItem('setupTime', now);
  }
}
