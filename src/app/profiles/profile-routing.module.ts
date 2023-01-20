import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfilesComponent } from "./profiles.component";

const profileRoutes: Routes = [
    {
        path: '',
        component: ProfilesComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(profileRoutes)],
    exports: [RouterModule]
})

export class ProfilesRoutingModule {}