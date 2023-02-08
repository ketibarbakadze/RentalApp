import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }


  getAllHotels():Observable<any>{
    const hotelApi ='http://airbnb-dev.us-east-1.elasticbeanstalk.com/api/Hotel'
    return this.http.get(hotelApi)
  }

  getHotelById(id:string):Observable<any>{
    const hotelById = `http://airbnb-dev.us-east-1.elasticbeanstalk.com/api/Hotel/${id}`
    
    return this.http.get(hotelById)
  }

  
}
