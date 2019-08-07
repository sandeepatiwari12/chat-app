import { Component, OnInit } from "@angular/core";
import { SocketService } from "../../chat/chat.ervices/socket-service/socket.service";
import { MatSnackBar } from "@angular/material";
import { StorageMap } from "@ngx-pwa/local-storage";
import { Router } from "@angular/router";
import { ChatService } from "../../chat/chats/chat.service";
import { LoginService } from "../../login/login.service";

@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
  styleUrls: ["home.component.scss"]
})
export class HomeComponent implements OnInit {
  userDetails: any;
  chatRoom: any;
  chatList: any = [];
  chatRooms: any = [
    {
      name: "Frontend Technology",
      value: "frontend"
    },
    {
      name: "Server Technology",
      value: "server"
    },
    {
      name: "DevOps Technology",
      value: "devops"
    }
  ];
  newUserName: any;
  constructor(
    private socketService: SocketService,
    private snackbar: MatSnackBar,
    private storageMap: StorageMap,
    private router: Router,
    private chatService: ChatService,
    private loginService: LoginService
  ) {
    this.getLoggedInUser();
  }

  ngOnInit() {
    this.getNewJoinee();
    this.getPrevMsg();
    this.getNewMessage();
  }

  getLoggedInUser() {
    this.userDetails = JSON.parse(localStorage.getItem("loggedInUser"));
    if (this.userDetails && this.userDetails.room) {
      this.chatRoom = this.userDetails.room;
      this.onChange();
    }
    this.storageMap.get("chats").subscribe((chats: any) => {
      if (chats && chats.length > 0) {
        chats.forEach(chat => {
          this.chatList.push(chat);
        });
      }
    });
  }

  onChange(e?: any) {
    this.userDetails.room = this.chatRoom;
    localStorage.setItem("loggedInUser", JSON.stringify(this.userDetails));
    this.socketService.joinRoom(this.userDetails);
  }
  getNewJoinee() {
    this.socketService.getNewJoinee().subscribe(
      (res: any) => {
        this.chatList.push(res);
      },
      err => {
        this.showErrorMessage("something went wrong", "ok");
        console.log("something went wrong", err);
      }
    );
  }
  getNewMessage() {
    this.socketService.getNewMessage().subscribe((res: any) => {
      this.chatList.push(res);
    });
  }
  getLastMessage(chat) {
    this.chatList.push(chat);
  }
  getPrevMsg() {
    this.chatService.getAllChats().subscribe((res: any) => {
      if (res && res.data) {
        res.data.forEach(chat => {
          this.chatList.push(chat);
        });
      }
    });
  }
  showErrorMessage(msg1, msg2) {
    this.snackbar.open(msg1, msg2, { duration: 4000 });
  }
  updateUser() {
    this.userDetails.newUserName = this.newUserName;
    this.userDetails.room = this.chatRoom;
    this.loginService.updateUser(this.userDetails).subscribe((res: any) => {
      if (res && res.status == "ok") {
        this.socketService.updateUsername(res.data);
        this.userDetails = res.data;
        localStorage.setItem("loggedInUser", JSON.stringify(res.data));
        this.informAll();
      }
    });
  }
  informAll() {
    this.socketService.informToAll().subscribe((response: any) => {
      console.log('this is the service for inform to all', response)
      this.chatList.push(response);
    });
  }
  logout() {
    this.showErrorMessage("You have logged out succesfully...", "Got it");
    this.router.navigate(["/login"]);
    localStorage.clear();
  }
}
