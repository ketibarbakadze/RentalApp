import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { FilterServiceService } from './filter-service.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  filterCat!: any[];
  constructor(
    public dialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute,
    public http:FilterServiceService
  ) {}

  ngOnInit(): void {
    this.http.getAllCategory().subscribe(response => this.filterCat = response)
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(FilterModalComponent,{
      maxWidth:'42vw'
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  
}
