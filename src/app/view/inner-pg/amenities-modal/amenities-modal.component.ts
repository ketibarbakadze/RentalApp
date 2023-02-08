import {
  Component,
  Output,
  EventEmitter,
  Inject,
  OnInit,
  inject,
} from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-amenities-modal',
  templateUrl: './amenities-modal.component.html',
  styleUrls: ['./amenities-modal.component.css'],
})
export class AmenitiesModalComponent implements OnInit {
  faXmark: any = faXmark;
  offers!: any;
  constructor(
    private dialogRef: MatDialogRef<AmenitiesModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    this.offers = this.data.offers;
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
