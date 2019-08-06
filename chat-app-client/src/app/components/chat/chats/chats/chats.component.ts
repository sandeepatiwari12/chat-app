import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { SocketService } from '../../chat.ervices/socket-service/socket.service';

@Component({
    selector: 'app-chats',
    templateUrl: 'chats.component.html',
    styleUrls: ['chats.component.scss']
})

export class ChatsComponent implements OnInit, OnChanges {
    @Input() chatList: any;
    @Output()  onSentMessage = new EventEmitter<any>();
    userDetails: any = {}
    message: string;
    constructor(
        private socketService: SocketService) { 
        this.userDetails = JSON.parse(sessionStorage.getItem('sessionUser'));
    }

    ngOnInit() { 

    }
    ngOnChanges() {
    }

    sendMessage() {
        if(this.message == '') {
            return
        }
        const postBody = {
            username: this.userDetails.username,
            room: this.userDetails.room,
            message: this.message,
            date: new Date()
        }
        this.socketService.sendMessage(postBody);
        this.onSentMessage.emit(postBody);
        this.message = '';
    }
}
