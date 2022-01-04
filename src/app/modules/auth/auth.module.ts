import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthConfig, AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { AdminGuard } from "./_gaurds/admin.guard";
import { CookieService } from "ngx-cookie";
import { UserGurd } from "./_gaurds/user.guard";
import { AdminGuardService } from "./_gaurds/admin-gurd.service";
export interface UserData {
  id?: string;
  uuid?: string;
  name: string;
  email: string;
  token: string;
  role: string;
  role_id?: string | number;
  user_id?: string | number;
  avatar?: string;
  account_type?: string;
  status: number;
  test_mode?: boolean;
}

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [AuthService, AuthGuard, AdminGuard, UserGurd,AdminGuardService]
})
export class AuthModule {
  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    if (parentModule) {
      throw new Error(
        "AlertModule is already loaded. Import it in the AppModule only"
      );
    }
  }

  static forRoot(@Optional() config?: AuthConfig): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [{ provide: AuthConfig, useValue: config }]
    };
  }
}
