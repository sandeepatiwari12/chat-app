import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LoginService } from '../../login/login.service';

@Component({
    selector: 'app-signup',
    templateUrl: 'signup.component.html',
    styleUrls: ['signup.component.scss']
})

export class SignUpComponent implements OnInit {
    signupObj: any = {}
    allUsers: any;
    constructor(
            private router: Router,
            private loginServise: LoginService,
            private snackbar: MatSnackBar
    ) {
     }

    ngOnInit() {}
    signup() {
        this.loginServise.creareUser(this.signupObj).subscribe((res) => {
            if(res && res.status == 'ok') {
                    this.showError('New user added succesfully', 'Got it');
                    this.router.navigate(['/login'])
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
