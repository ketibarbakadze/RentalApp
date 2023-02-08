import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css'],
})
export class CardItemComponent implements OnInit {
  @Input() card!: any;
  @Input() index!: number;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
  }

  toInnerPage(index: number) {
    this.router.navigate([index], { relativeTo: this.route });
  }
}
