import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs";
import { APIService } from 'src/app/components/shared/global.api.settings.service';

@Injectable({
  providedIn: "root"
})
export class SocketService {
  private socket = io(this.apiService.getApiUrl());
  constructor(
    private apiService: APIService ) {
    }

  joinRoom(postObj) {
    this.socket.emit("new_user_joined", {
      username: postObj.username,
      room: postObj.room
    });
  }
  getNewJoinee() {
    return new Observable(observer => {
      this.socket.on("server_new_user_joined", data => {
        observer.next(data);
      });
    });
  }  
  getNewMessage() {
    return new Observable(observer => {
      this.socket.on("server_new_message", data => {
        observer.next(data);
      });
    });
  }

  sendMessage(postObj) {
    this.socket.emit('new_message', {
      username: postObj.username,
      message: postObj.message,
      room: postObj.room
    });
  }

  updateUsername(postObj) {
    this.socket.emit('update_username', postObj)
  }

  informToAll() {
    return new Observable(observer => {
      this.socket.on("get_user_update", data => {
        observer.next(data);
      });
    });
  }
}
