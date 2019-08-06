import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { SignUpService } from '../signup.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-signup',
    templateUrl: 'signup.component.html',
    styleUrls: ['signup.component.scss']
})

export class SignUpComponent implements OnInit {
    signupObj: any = {}
    allUsers: any;
    constructor(
            private storageMap: StorageMap,
            private router: Router,
            private signUpService: SignUpService,
            private snackbar: MatSnackBar
    ) {
        this.getAlltheUsers();
     }

    ngOnInit() {}
    getAlltheUsers() {
        this.storageMap.get('users').subscribe((users) => {
            this.allUsers = users;
        });
    }
    signup() {
        this.signupObj.allUsers = JSON.stringify(this.allUsers);
        this.signUpService.creareUser(this.signupObj).subscribe((res) => {
            if(res && res.status == 'ok') {
                this.storageMap.set('users', res.data).subscribe(() => {
                    this.showError('New user added succesfully', 'Got it');
                    this.router.navigate(['/login'])
                });
            } else {
                this.showError(res.message, res.status);
            }
            this.signupObj = {};
        });
    }

    showError(msg1, msg2) {
        this.snackbar.open(msg1, msg2, {duration: 4000})
    }
}
