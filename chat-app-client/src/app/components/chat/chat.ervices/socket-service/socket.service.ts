import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs";
import { LocalStorage, StorageMap } from '@ngx-pwa/local-storage';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: "root"
})
export class SocketService {
  private socket = io(environment.API_URL);
  constructor(private localStorage: LocalStorage,
              private storageMap: StorageMap
    ) {
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
}
