import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterServiceService } from '../header/filter/filter-service.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  cards!: any[];
  constructor( private route:ActivatedRoute,private filterS:FilterServiceService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['Id']) {
        this.filterS.filterByCategoryId(params['Id']).subscribe((response:any) => this.cards = response);
      } else {
        this.filterS.getByAllCategory(params).subscribe((response:any) => this.cards = response)
      }
    });
  }
  
}
