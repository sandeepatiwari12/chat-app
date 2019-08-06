import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { UserListModule } from '../chat/user.lists/user.list.module';
import { ChatsModule } from '../chat/chats/chats.module';
import { AngularMaterialModule } from 'src/assets/angular-material/angular.material.module';

@NgModule({
    imports: [HomeRoutingModule, UserListModule, ChatsModule, AngularMaterialModule],
    exports: [],
    declarations: [HomeComponent],
    providers: [],
})
export class HomeModule { }
