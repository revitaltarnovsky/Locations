import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/_models/car';
import { Location } from 'src/app/_models/location';
import { User } from 'src/app/_models/user';
import { CarsService } from 'src/app/_services/cars.service';
import { LocationsService } from 'src/app/_services/locations.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss']
})
export class LocationModalComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  locations: Location[] = [];
  selectedLocation?: Location;
  locationCars: Car[] = [];
  cars: Car[] = [];
  users: User[] = [];  
  showImage: boolean = false;
  
  constructor(public bsModalRef: BsModalRef, private locationsService: LocationsService,
    private carsService: CarsService, private usersService: UsersService) { }

  ngOnInit(): void {

    this.loadLocations();
    this.loadUsers();
  }

  loadLocations() {
    this.subscriptions.add(this.locationsService.getLocations().subscribe(data => {
      this.locations = data;
      this.locations.forEach(location => {
        location.img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
      });
    }));
  }

  loadUsers() {
    this.subscriptions.add(this.usersService.getUsers().subscribe(data => {
      this.users = data;
    })); 
  }

  onSelected() {
    this.showImage = false;
    if(this.selectedLocation) {
      this.loadLocationCars(this.selectedLocation.carNumber);
      this.locationCars = [];
    }
  }

  loadLocationCars(carNumber: string) {
    this.subscriptions.add(this.carsService.getCars().subscribe(data => {
      this.cars = data;
      this.cars.forEach(car => {
        if (car.carNumber === carNumber) {
          this.locationCars.push(car);
        }
      });
      if (this.locationCars.length > 0) {
        this.showImage = true;
      }
    }));
  }

  displayCarOwnerName(userIndex: string) {
    let carOwner: User | undefined;
    carOwner = this.users.find(u => u.userIndex === userIndex);
    if(carOwner) return carOwner.fullName;
    return '';
  }

  displayVisitTime(locationDateTime: string | undefined) {
    if(locationDateTime){
      return locationDateTime.slice(11);
    }
    return '';
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
