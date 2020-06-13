import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedmoduleModule } from './sharedmodule/sharedmodule.module';
import { LoginComponent } from './Module/login/login.component';
import { RouteRoutingModule } from './Routing/route/route-routing.module';
import { HeaderComponent } from './Layout/header/header.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { MenuComponent } from './Layout/menu/menu.component';
//language//
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './Services/login/loginservice.service';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/Localization/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    SharedmoduleModule.forRoot(),
    RouteRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private translate: TranslateService) {
    this.translate.use('ar');
  }
}