import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-aircover-modal',
  templateUrl: './aircover-modal.component.html',
  styleUrls: ['./aircover-modal.component.css'],
})
export class AircoverModalComponent implements OnInit {
  faXmark: any = faXmark;
  constructor(private dialogRef: MatDialogRef<AircoverModalComponent>) {}

  ngOnInit(): void {}
  closeDialog() {
    this.dialogRef.close();
  }
}
