import { NgModule } from '@angular/core';

import { SignUpComponent } from './signup/signup.component';
import { AngularMaterialModule } from 'src/assets/angular-material/angular.material.module';
import { SignUpRoutingModule } from './signup-routing.module';
import { SignUpService } from './signup.service';

@NgModule({
    imports: [AngularMaterialModule, SignUpRoutingModule],
    exports: [],
    declarations: [SignUpComponent],
    providers: [SignUpService],
})
export class SignUpModule { }
