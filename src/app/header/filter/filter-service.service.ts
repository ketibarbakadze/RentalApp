import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FilterServiceService {
 
  constructor(private http:HttpClient) {}

  getAllCategory():Observable<any>{
    const categoryApi ='http://airbnb-dev.us-east-1.elasticbeanstalk.com/api/Category'
    return this.http.get(categoryApi)
  }

  filterByCategoryId(id:string){
    const api = `http://airbnb-dev.us-east-1.elasticbeanstalk.com/api/Hotel/filter-by-category?Id=${id}`  
    return this.http.get(api)
  }

  getByAllCategory(obj: any): Observable<any> {
    const api = `http://airbnb-dev.us-east-1.elasticbeanstalk.com/api/Hotel/filter-by-category`;

    const params = new HttpParams({ fromObject: obj });

    return this.http.get(api, { params });
  }
  
}
