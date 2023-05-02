import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UsersService } from 'src/app/_services/users.service';
// import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserDetailsModalComponent } from '../user-details-modal/user-details-modal.component';
import { LocationModalComponent } from '../additional-details/location-modal.component';
import { Subscription } from 'rxjs';
// import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  // providers: [MDBModalService]
})
export class MainComponent implements OnInit, OnDestroy {
  users: User[] = [];
  searchText = '';
  key: string = 'fullName';
  reverse: boolean = false;
  p: number = 1;
  modalRef?: BsModalRef;
  subscriptions: Subscription = new Subscription();

  constructor(private usersService: UsersService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.subscriptions.add(this.usersService.getUsers().subscribe(data => {
      this.users = data;
    })); 
  }

  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  openModal(user: User) {
    this.modalRef = this.modalService.show(UserDetailsModalComponent, {
      initialState: {user: user}
    })
  }

  openLocationModal() {
    this.modalRef = this.modalService.show(LocationModalComponent);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}