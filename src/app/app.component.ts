import { Component, OnInit } from '@angular/core';
import { LoadingService } from './sharedServices/loading.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadingStatus: boolean = false;

  constructor(private loader: LoadingService) {}

  ngOnInit(): void {
    this.loader.loadingEmitter.subscribe((resp) => {
      this.loadingStatus = resp
    });
    let now: any = new Date();
    let hours = 24;
    let setupTime: any = localStorage.getItem('setupTime');
    if (now - setupTime > hours * 3600 * 1000) {
      localStorage.removeItem('payments');
    }
  }
  title = 'RentalApp';
}
