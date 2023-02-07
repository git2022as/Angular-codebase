import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { LoginComponent } from "./component/login/login.component";
import { RegisterComponent } from "./component/register/register.component";

const authRoutes : Routes = [
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})

export class AuthRoutingModule {}
