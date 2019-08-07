import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
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
        private router: Router,
        private loginService: LoginService,
        private snackbar: MatSnackBar) {
         }

    ngOnInit() { }
    login() {
        this.loginService.login(this.loginObj).subscribe((res) => {
            if(res && res.status == 'ok') {
                    this.showError(res.message, 'Got it');
                    localStorage.setItem('loggedInUser', JSON.stringify(res.data));
                    this.router.navigate(['/chats']);
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
