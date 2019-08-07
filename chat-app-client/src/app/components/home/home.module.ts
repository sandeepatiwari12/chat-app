import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ChatsModule } from '../chat/chats/chats.module';
import { AngularMaterialModule } from 'src/assets/angular-material/angular.material.module';
import { ChatService } from '../chat/chats/chat.service';
import { LoginService } from '../login/login.service';

@NgModule({
    imports: [HomeRoutingModule, ChatsModule, AngularMaterialModule],
    exports: [],
    declarations: [HomeComponent],
    providers: [ChatService, LoginService],
})
export class HomeModule { }
