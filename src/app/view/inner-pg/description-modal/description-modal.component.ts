import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Inject,
  inject,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-description-modal',
  templateUrl: './description-modal.component.html',
  styleUrls: ['./description-modal.component.css'],
})
export class DescriptionModalComponent implements OnInit {
  faXmark: any = faXmark;
  description!: string;
  constructor(
    private dialogRef: MatDialogRef<DescriptionModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    this.description = this.data.text;
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
