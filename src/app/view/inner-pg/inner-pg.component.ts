import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiServiceService } from 'src/app/sharedServices/cardApiService/api-service.service';
import {
  faUserCheck,
  faStar,
  faChildren,
  faPerson,
  faMedal,
  faArrowUpFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faCalendar } from '@fortawesome/free-regular-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { AmenitiesModalComponent } from './amenities-modal/amenities-modal.component';
import { AircoverModalComponent } from './aircover-modal/aircover-modal.component';
import { DescriptionModalComponent } from './description-modal/description-modal.component';
@Component({
  selector: 'app-inner-pg',
  templateUrl: './inner-pg.component.html',
  styleUrls: ['./inner-pg.component.css'],
})
export class InnerPgComponent implements OnInit {
  card!: any;
  faPerson: any = faPerson;
  faArrowUpFromBracket: any = faArrowUpFromBracket;
  faHeart: any = faHeart;
  faStar: any = faStar;
  faMedal: any = faMedal;
  faCalendar: any = faCalendar;
  faChildren: any = faChildren;
  faUserCheck: any = faUserCheck;
  startDate: Date = new Date();
  endDate: Date = new Date();
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private ApiService: ApiServiceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.ApiService.getHotelById(params['id']).subscribe((result) => {
        this.card = result;
      });
    });
  }

  personCount(room: Array<any>): number {
    let persons = 0;
    room.forEach((bedroom) => {
      persons += bedroom.personsCount;
    });
    return persons;
  }
  bedRoomCount(room: Array<any>): number {
    let beds = 0;
    room.forEach((bedroom) => {
      beds += bedroom.bedsCount;
    });
    return beds;
  }
  bathRoomCount(room: Array<any>): number {
    let baths = 0;
    room.forEach((bedroom) => {
      baths += bedroom.bathRoomsCount;
    });
    return baths;
  }
  childPolicy(rooms: Array<any>) {
    let text: string = 'Children are not allowed, ';
    rooms.forEach((element, index) => {
      if (element.childPolicy == true) {
        if (text === 'Children are not allowed, ') {
          text = 'Children are allowed in : ';
        }
        text += `room ${index + 1}, `;
      }
    });
    return text.substring(0, text.length - 2);
  }
  childrenAllowed(rooms: Array<any>) {
    let allowed: boolean = false;
    rooms.forEach((element, index) => {
      if (element.childPolicy == true) {
        allowed = true;
      }
    });
    return allowed;
  }
  openDialogAmenities(offers: any): void {
    const dialogRef = this.dialog.open(AmenitiesModalComponent, {
      width: '780px',
      height: '800px',
      data: { offers: offers },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogAircover(): void {
    const dialogRef = this.dialog.open(AircoverModalComponent, {
      width: '1000px',
      height: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogDescription(text: string): void {
    const dialogRef = this.dialog.open(DescriptionModalComponent, {
      width: '1000px',
      data: { text: text },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  makeSubstring(text: String) {
    let newText = text.substring(0, 500);
    return newText.substring(0, newText.lastIndexOf(' '));
  }
  hostName(text: string) {
    if (text.substring(0, 6) == 'Hosted') {
      return text.substring(10, text.length);
    }
    return text;
  }
  getAllImages(rooms: Array<any>) {
    let images: Array<string> = [];
    rooms.forEach((room) => {
      images = [...images, ...room.images];
    });
    return images.length > 30 ? images.slice(0, 30) : images;
  }

  takedata(event: any) {
    this.startDate = event[0];
    this.endDate = event[1];
    console.log(`${this.startDate} :  ${this.endDate}`);
  }

  getCardPrice(room: Array<any>): number {
    let price = 0;
    room.forEach((bedroom) => {
      price += bedroom.price;
    });
    return price;
  }
}
