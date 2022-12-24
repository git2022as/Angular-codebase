import { NgModule } from "@angular/core";
import { LayoutComponent } from "./layout.component";
import { HeaderModule } from "../header/header.module";

@NgModule({
    declarations: [
        LayoutComponent,
    ],
    imports: [
        HeaderModule
    ],
    exports: [
        LayoutComponent
    ],
    providers: []
})

export class LayoutModule {}