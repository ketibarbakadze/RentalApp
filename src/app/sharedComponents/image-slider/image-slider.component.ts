import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
})
export class ImageSliderComponent implements OnInit {
  @Input() sliderImages!: string[];
  @Input() height!: string;
  @Input() width!: string;
  @Input() cardId!: string;

  constructor() {}

  ngOnInit(): void {}

}
