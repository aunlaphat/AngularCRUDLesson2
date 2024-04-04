import { Component, OnInit } from '@angular/core';
import { Hotels } from 'src/app/interface/hotels';
import { HotelsService } from 'src/app/service/hotels.service';

@Component({
  
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
  
  
})

export class HotelsComponent implements OnInit{


  hotels: Hotels[] = [];

  constructor(private hotelsService: HotelsService) { }

  ngOnInit(): void {
    this.getHotels();
  }

  getHotels(): void {
    this.hotelsService.getHotels()
        .subscribe(hotels => this.hotels = hotels);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.hotelsService.addHotel({ name } as Hotels)
      .subscribe(hotels => {
        this.hotels.push(hotels);
      });
  }

  delete(hotels: Hotels): void {
    this.hotels = this.hotels.filter(h => h !== hotels);
    this.hotelsService.deleteHotel(hotels.id).subscribe();
  }
}
