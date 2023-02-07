import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterComponent } from "./component/register/register.component";
import { LoginComponent } from "./component/login/login.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { regReducer } from "../store/reducers";

@NgModule({
    imports: [
        CommonModule, 
        AuthRoutingModule, 
        ReactiveFormsModule,
        StoreModule.forFeature('registerAuth', regReducer) //first argument is feature name (give any name) & 2nd argument is the exported reducer function
    ],
    declarations: [
        RegisterComponent, 
        LoginComponent
    ],
    exports: []
})

export class AuthModule {}