import { NgModule } from '@angular/core';

import { ChatsComponent } from './chats/chats.component';
import { AngularMaterialModule } from 'src/assets/angular-material/angular.material.module';
import { ChatService } from './chat.service';

@NgModule({
    imports: [AngularMaterialModule],
    exports: [ChatsComponent],
    declarations: [ChatsComponent],
    providers: [ChatService],
})
export class ChatsModule { }
