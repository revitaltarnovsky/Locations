import { Component, OnDestroy, OnInit } from '@angular/core';
// import { MDBModalRef } from 'ng-uikit-pro-standard';
import { User } from 'src/app/_models/user';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CarsService } from 'src/app/_services/cars.service';
import { Car } from 'src/app/_models/car';
import { LocationsService } from 'src/app/_services/locations.service';
import { Location } from 'src/app/_models/location';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details-modal',
  templateUrl: './user-details-modal.component.html',
  styleUrls: ['./user-details-modal.component.scss']
})
export class UserDetailsModalComponent implements OnInit, OnDestroy {
  user: User | undefined;
  activeTab: TabDirective | undefined;
  cars: Car[] = [];
  userCars: Car[] = [];
  locations: Location[] = []; 
  userLocations: Location[] = [];
  subscriptions: Subscription = new Subscription();
  isLoadingCars$ = this.carsService.isLoading$;
  isLoadingLocations$ = this.locationsService.isLoading$;

  constructor(public modalRef: BsModalRef, private sanitizer: DomSanitizer,
     private carsService: CarsService, private locationsService: LocationsService) { }
     
     ngOnInit(): void {
       this.loadCars();
      }
      
      onTabActivated(data:TabDirective){
        this.activeTab = data;
      }
      
      convertBase64ToImg(imagePath?: string): SafeResourceUrl{
        let prefix = '';
        if(imagePath) {
          prefix = imagePath.slice(0,22);
          imagePath = imagePath.replace(prefix,"");
        }
        return this.sanitizer.bypassSecurityTrustResourceUrl(prefix + imagePath);
      }
      
      loadCars() {
        this.subscriptions.add(this.carsService.getCars().subscribe(data => {
          this.cars = data;
          this.cars.forEach(car => {
            if (car.userIndex === this.user?.userIndex) {
              this.userCars.push(car);
            }
          });
          this.loadLocations();
        }));
      }
      
      loadLocations() {
        this.subscriptions.add(this.locationsService.getLocations().subscribe(data => {
          this.locations = data;
          this.locations.forEach(loc => {
            for (const car of this.userCars) {
              if (loc.carNumber === car.carNumber) {
                this.userLocations.push(loc);
              }
            }
          })
        }));
      }
      
      modifyDateTimeToDate(date: string): string {  
        date = date.slice(0,10);
        return date;
      }
      
      ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
      }
}

