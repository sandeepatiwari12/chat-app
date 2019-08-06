import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../chat/chat.ervices/socket-service/socket.service';
import { MatSnackBar } from '@angular/material';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit {
    userDetails: any;
    chatRoom: any;
    users: any = [];
    chatList: any = [];
    chatRooms: any = [
        {
            name: 'Frontend Technology',
            value: 'frontend'
        },
        {
            name: 'Server Technology',
            value: 'server'
        },
        {
            name: 'DevOps Technology',
            value: 'devops'
        }
    ]
    constructor(
        private socketService: SocketService,
        private snackbar: MatSnackBar,
        private storageMap: StorageMap,
        private router: Router
    ) {
        this.getLoggedInUser();
     }

    ngOnInit() { 
        this.getNewJoinee();
        this.getNewMessage();
    }

    getLoggedInUser() {
        this.storageMap.get('loggedInUser').subscribe((users) => {
            this.userDetails = users;
        });
    }

    onChange(e) {
        const postBody = {
            username: this.userDetails.username,
            room: e
        }
        sessionStorage.setItem('sessionUser', JSON.stringify(postBody))
        this.socketService.joinRoom(postBody)
    }
    getNewJoinee() {
        this.socketService.getNewJoinee().subscribe((res: any) => {
            this.users.push(res);
            this.snackbar.open(res.message, res.room, {duration: 4000})

        }, (err) => {
            this.showErrorMessage('something went wrong', 'ok');
            console.log('something went wrong', err);
        });
    }
    getNewMessage() {
        console.log('inside get new  message', event)
        this.socketService.getNewMessage().subscribe((res: any) => {
            console.log('the server response is chatList ', res);
            this.chatList.push(res);
            this.showErrorMessage(res.message, res.username)

        }, (err) => {
            this.showErrorMessage('something went wrong', 'ok');
            console.log('something went wrong', err);
        });
    }
    getSentMessage(event) {
        this.chatList.push(event);
        // this.getNewMessage();

    }
    showErrorMessage(msg1, msg2) {
        this.snackbar.open(msg1, msg2, {duration: 4000})
    }
    logout() {
        this.storageMap.clear().subscribe(() => {
            this.showErrorMessage('You have logged out succesfully... Note: All the data has been deleted from store', 'Got it');
            this.router.navigate(['/login'])
        })
    }
}
