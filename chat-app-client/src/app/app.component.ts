import { Component, OnInit } from '@angular/core';
import { SocketService } from './components/chat/chat.ervices/socket-service/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private socketService: SocketService) {}

  ngOnInit() {
    
  }
}
