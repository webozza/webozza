import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { SafeHtmlModule } from "../modules/safe-html/safe-html.pipe";
import { PreloaderModule } from "../modules/preloader/preloader.module";
import { PageResolveService } from "./home-servie/page-resolve.service";
import { DateToLocalPipe } from "../modules/date-to-local.pipe";
import { SharedModule } from "./layout/shared/shared.module";

@NgModule({
  declarations: [HomeComponent,],
  imports: [SafeHtmlModule, CommonModule, HomeRoutingModule, PreloaderModule, SharedModule],
  providers: [PageResolveService]
})
export class HomeModule {}
