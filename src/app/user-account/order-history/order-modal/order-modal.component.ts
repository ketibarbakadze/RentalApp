import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FirebaseWorkerService } from 'src/app/sharedServices/firebase-worker.service';
import Swal from 'sweetalert2';
import { AccountServiceService } from '../../account-service.service';
import { User } from '../../user.model';
@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css'],
})
export class OrderModalComponent implements OnInit {
  faXmark: any = faXmark;
  order!: any;
  hotel!: any;
  user!: User;
  pendingStatus!:boolean

  constructor(
    private accountService: AccountServiceService,
    private fireStore: FirebaseWorkerService,
    private dialogRef: MatDialogRef<OrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    this.order = this.data.order;
    this.hotel = this.data.hotel;
    this.user = this.user = JSON.parse(<string>localStorage.getItem('user'));
    this.pendingStatus = this.data.order.pending
  }
  closeDialog() {
    this.dialogRef.close();
  }

  getRange() {
    let startTime = new Date(this.order.range.start).getTime();
    let endTime = new Date(this.order.range.end).getTime();
    let range = ((startTime - endTime) / (1000 * 3600 * 24)) * -1 + 1;
    return Math.ceil(range);
  }

  reserve() {
    if(this.user.cardNumber){
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
        this.updateOrders(this.user.orders, this.order.id)
      );
      this.fireStore.update(tempUser, this.user.id);
      localStorage.setItem('user', JSON.stringify(tempUser));
      this.accountService.userUpdated.next(tempUser);
      Swal.fire({
        icon: 'success',
        title: 'Your trip has been booked',
        showConfirmButton: true,
        timer: 1500
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please add your credit card to complete reservation',
      })
    }
    
  }
  cancelOrder() {
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
      this.deleteOrder(this.user.orders, this.order.id)
    );
    this.fireStore.update(tempUser, this.user.id);
    localStorage.setItem('user', JSON.stringify(tempUser));
    this.accountService.userUpdated.next(tempUser);
  }

  updateOrders(orders: any[], id: string) {
    orders.forEach((order, index) => {
      if (order.id == id) {
        orders[index].pending = false;
      }
    });
    return orders;
  }

  deleteOrder(orders: any[], id: string) {
    return orders.filter((order) => order.id != id);
  }
}
