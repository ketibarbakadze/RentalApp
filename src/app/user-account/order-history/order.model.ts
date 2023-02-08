export class Order {
  hotelId!: string;
  guestCount!: number;
  price!: number;
  constructor(hotelId: string, guestCount: number, price: number) {
    this.hotelId = hotelId;
    this.guestCount = guestCount;
    this.price = price;
  }
}
