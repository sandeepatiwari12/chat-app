import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'app-user-list',
    templateUrl: 'user.list.component.html'
})

export class UserListComponent implements OnInit, OnChanges {
    @Input() usersList: any;
    constructor() { }

    ngOnInit() {
    }
    ngOnChanges() {

        console.log(this.usersList)
    }
}
