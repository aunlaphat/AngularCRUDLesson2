import { Component, OnInit } from '@angular/core';
import { HotelsService } from 'src/app/service/hotels.service';
import { Hotels } from 'src/app/interface/hotels';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  hotels: Hotels[] = [];

  constructor(private hotelsService: HotelsService) { }

  ngOnInit(): void {
    this.getHotels();
  }

  getHotels(): void {
    this.hotelsService.getHotels()
      .subscribe(hotels => this.hotels = hotels.slice(1, 5));
  }
}
