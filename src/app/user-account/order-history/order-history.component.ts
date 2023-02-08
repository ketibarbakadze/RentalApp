import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Order } from './order.model';
import { ApiServiceService } from '../../sharedServices/cardApiService/api-service.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderModalComponent } from './order-modal/order-modal.component';
import { User } from '../user.model';
import { AccountServiceService } from '../account-service.service';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  user: User = new User('1', '', '', true, '', '', '', '', '', '', []);
  orders!: any[];
  hotels!: any[];
  constructor(
    private accountService: AccountServiceService,
    private http: ApiServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.http.getAllHotels().subscribe((response: any) => {
      this.hotels = response;
    });
    if (localStorage.getItem('user') === null) {
      localStorage.setItem(
        'user',
        JSON.stringify(new User('1', '', '', true, '', '', '', '', '', '', []))
      );
      this.user = JSON.parse(<string>localStorage.getItem('user'));
      this.orders = this.user.orders;
    } else {
      this.user = JSON.parse(<string>localStorage.getItem('user'));
      this.orders = this.user.orders;
    }
    this.accountService.userUpdated.subscribe((response) => {
      this.user = response;
      this.orders = response.orders;
    });
  }
  
  getHotelById(id: string) {
    return this.hotels.filter((hotel) => hotel.id == id)[0];
  }
  
  openDialogOrder(order: any, hotel: any): void {
    const dialogRef = this.dialog.open(OrderModalComponent, {
      width: '1000px',
      data: { order: order, hotel: hotel },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
