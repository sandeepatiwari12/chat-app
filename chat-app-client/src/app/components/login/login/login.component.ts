import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit {
    loginObj: any  = {};
    allUsers: any;

    constructor(
        private storageMap: StorageMap,
        private router: Router,
        private loginService: LoginService,
        private snackbar: MatSnackBar) {
            this.getAlltheUsers();
         }

    ngOnInit() { }

    getAlltheUsers() {
        this.storageMap.get('users').subscribe((users) => {
            this.allUsers = users;
        });
    }
    login() {
        this.loginObj.allUsers = this.allUsers;
        this.loginService.login(this.loginObj).subscribe((res) => {
            console.log('response after login', res);
            if(res && res.status == 'ok') {

                this.storageMap.set('loggedInUser', res.data).subscribe(() => {
                    this.showError(res.message, 'Got it');
                    this.router.navigate(['/chats']);
                });
            } else {
                this.showError(res.message, res.status)
            }
        });
    }

    showError(msg1, msg2) {
        this.snackbar.open(msg1, msg2, {duration: 4000})
    }
    register() {
        this.router.navigate(['/signup'])
    }
}
