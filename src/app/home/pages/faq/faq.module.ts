import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FaqComponent } from "./faq.component";
import { Routes, RouterModule } from "@angular/router";
import { PageResolveService } from "../../home-servie/page-resolve.service";
import { SafeHtmlModule } from "../../../modules/safe-html/safe-html.pipe";
const routes: Routes = [{ path: "", component: FaqComponent }];
@NgModule({
  declarations: [FaqComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SafeHtmlModule],
  providers: [PageResolveService]
})
export class FaqModule {}
