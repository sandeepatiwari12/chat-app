import { NgModule } from '@angular/core';
import { AngularMaterialModule } from 'src/assets/angular-material/angular.material.module';
import { UserListComponent } from './user.list/user.list.component';
import { UserListService } from './user.list.service';

@NgModule({
  imports: [AngularMaterialModule],
  exports: [UserListComponent],
  declarations: [UserListComponent],
  providers: [UserListService]
})
export class UserListModule {}
