export class Card {
  img!: string;
  country!: string;
  city!: string;
  distance!: number;
  price!: number;
  constructor(
    img: string,
    country: string,
    city: string,
    distance: number,
    price: number
  ) {
    this.img = img;
    this.country = country;
    this.city = city;
    this.distance = distance;
    this.price = price;
  }
}
