import { Component, Input, OnInit} from '@angular/core';
import { Hotels } from 'src/app/interface/hotels';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HotelsService } from 'src/app/service/hotels.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {
  hotels: Hotels | undefined;

  constructor(
    private route: ActivatedRoute,
    private hotelsService: HotelsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHotel();
  }

  getHotel(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.hotelsService.getHotel(id)
        .subscribe(hotels => this.hotels = hotels);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hotels) {
      this.hotelsService.updateHero(this.hotels)
        .subscribe(() => this.goBack());
    }
  }
}
