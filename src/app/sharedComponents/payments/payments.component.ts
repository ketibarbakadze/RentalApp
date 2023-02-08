import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/sharedServices/cardApiService/api-service.service';
import { FirebaseWorkerService } from 'src/app/sharedServices/firebase-worker.service';
import { User } from 'src/app/user-account/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  user!: User;
  payFull: boolean = true;
  payPart: boolean = false;
  hotel!: any;
  paymentsObj!: any;
  guestsObj!: any;
  paramsId!: string;
  cardForm!: FormControl;
  constructor(
    private route: ActivatedRoute,
    private http: ApiServiceService,
    private router: Router,
    private fireStore: FirebaseWorkerService
  ) {}

  ngOnInit(): void {
    this.getRange();

    this.paymentsObj = JSON.parse(localStorage.getItem('payments')!);
    this.user = JSON.parse(<string>localStorage.getItem('user'));

    (this.cardForm = new FormControl(this.user.cardNumber, [
      Validators.required,
      Validators.maxLength(20),
      Validators.pattern(
        `[0-9][0-9][0-9][0-9]+-[0-9][0-9][0-9][0-9]+-[0-9][0-9][0-9][0-9]+-[0-9][0-9][0-9][0-9]`
      ),
    ])),
      (this.paramsId = this.paymentsObj.hotelId);

    this.http
      .getHotelById(this.paramsId)
      .subscribe((hotelObj) => (this.hotel = hotelObj));

    this.guestsObj = Object.entries(this.paymentsObj).reduce(
      (acc: any, [key, value]) => {
        let namesArr = ['adults', 'children', 'infants', 'pets'];
        if (namesArr.includes(key)) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );
  }

  setGuests() {
    let tmpArr = 0;
    for (let key in this.guestsObj) {
      let str = Number(this.guestsObj[key]);
      tmpArr += str;
    }
    return `${tmpArr} guests`;
  }

  inputChecked(input: any) {
    if (input.value == 1) {
      this.payFull = true;
      this.payPart = false;
    } else {
      this.payFull = false;
      this.payPart = true;
    }
    return (input.checked = true);
  }

  onSubmit() {
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
      this.updateOrders(this.user.orders, this.paymentsObj.id)
    );

    this.router.navigate(['/view']);

    Swal.fire({
      icon: 'success',
      title:
        'Your order has been placed, check order history for more information',
      showConfirmButton: true,
      confirmButtonText: 'Close',
    });

    this.fireStore.update(tempUser, this.user.id);
    localStorage.setItem('user', JSON.stringify(tempUser));
    localStorage.removeItem('payments');
  }

  getRange() {
    let tmpObj = JSON.parse(localStorage.getItem('payments')!);
    let startTime = new Date(tmpObj.range.start).getTime();
    let endTime = new Date(tmpObj.range.end).getTime();
    let range = ((startTime - endTime) / (1000 * 3600 * 24)) * -1 + 1;
    return Math.ceil(range);
  }

  goBackBtn() {
    this.router.navigate(['/view', this.paramsId]);
  }

  updateOrders(orders: any[], id: string) {
    orders.forEach((order, index) => {
      if (order.id == id) {
        orders[index].pending = false;
      }
    });
    return orders;
  }
}
