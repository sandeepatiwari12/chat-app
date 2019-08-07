import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { SocketService } from '../../chat.ervices/socket-service/socket.service';
import { ChatService } from '../chat.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-chats',
    templateUrl: 'chats.component.html',
    styleUrls: ['chats.component.scss']
})

export class ChatsComponent implements OnInit, OnChanges {
    @Input() chatList: any;
    @Output()  onSentMessage = new EventEmitter<any>();
    userDetails: any = {};
    message: string;
    constructor(
        private socketService: SocketService,
        private chatService: ChatService,
        private snackbar: MatSnackBar) { 
    }

    ngOnInit() {
        this.userDetails = JSON.parse(localStorage.getItem('loggedInUser'));
    }
    ngOnChanges() {
    }

    sendMessage() {
        if(this.message == '') {
            return
        }
        const postBody = {
            username: this.userDetails.username,
            email: this.userDetails.email,
            room: this.userDetails.room,
            message: this.message,
            date: new Date()
        }
        this.socketService.sendMessage(postBody);
        this.chatService.storeChats(postBody).subscribe((result) => {
            this.snackbar.open('Message Sent Succesfully..', 'Got it', {duration: 3000})
        });
        this.onSentMessage.emit(postBody);
        this.message = '';
    }
}
