import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.css'],
})
export class FilterModalComponent implements OnInit {
  form!: any;

  roomsButton = ['Any', 1, 2, 3, 4, 5, 6, 7, '8'];
  propertyType = ['Home', 'Villa'];
  typeOfPlace = ['private room', 'Entire place'];
  Essentials = [
    'Wifi',
    'Kitchen',
    'Washer',
    'Dryer',
    'Air conditioning',
    'Heating',
    'Dedicated workspace',
    'TV',
    'Hair dryer',
    'Iron',
  ];
  features = [
    'Pool',
    'Hot tub',
    'Free parking on premises',
    'EV charger',
    'Crib',
    'Gym',
    'BBQ grill',
    'Breakfast',
    'Indoor fireplace',
    'Smoking allowed',
  ];
  location = ['Beachfront', 'Waterfront', 'Ski-in/ski-out'];
  safety = ['Smoke alarm', 'Carbon monoxide alarm'];
  languages = ['English', 'Georgian', 'French', 'German', 'Russian'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      typeOfPlace: new FormControl(),
      priceFrom: new FormControl(),
      priceTo: new FormControl(),
      roomsCount: new FormControl(),
      bedsPerRoomCount: new FormControl(),
      bathRoomsCounts: new FormControl(),
      propertyType: new FormControl(),
      Amenities: this.fb.array([]),
      Languages: this.fb.array([]),
    });
  }

  handleAmenities(e: any) {
    let AmenitiesArr = this.form.get('Amenities') as FormArray;
    if (e.target.checked) {
      AmenitiesArr.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      AmenitiesArr.controls.forEach((l: any) => {
        if (l.value == e.target.value) {
          AmenitiesArr.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  handleLanguages(e: any) {
    let LanguagesArr = this.form.get('Languages') as FormArray;
    if (e.target.checked) {
      LanguagesArr.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      LanguagesArr.controls.forEach((l: any) => {
        if (l.value == e.target.value) {
          LanguagesArr.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onSubmit() {
    let formValue = this.form.value;
    let jsonStr = JSON.stringify(formValue, (key, value) => {
      if (value !== null && value !== 'Any') {
        return value;
      }
    });

    let filteredObj = JSON.parse(jsonStr);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        PriceFrom: filteredObj.priceFrom,
        PriceTo: filteredObj.priceTo,
        TypeOfPlace: filteredObj.typeOfPlace,
        RoomsCount: filteredObj.roomsCount,
        BedsPerRoomCount: filteredObj.bedsPerRoomCount,
        BathRoomsCount: filteredObj.bathRoomsCount,
        PropertyType: filteredObj.propertyType,
        Amenities: filteredObj.Amenities,
        HostLanguages: filteredObj.Languages,
      },
    });
  }
}
