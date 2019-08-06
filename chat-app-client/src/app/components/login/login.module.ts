import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from 'src/assets/angular-material/angular.material.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginService } from './login.service';

@NgModule({
    imports: [AngularMaterialModule, LoginRoutingModule],
    exports: [],
    declarations: [LoginComponent],
    providers: [LoginService],
})
export class LoginModule { }
