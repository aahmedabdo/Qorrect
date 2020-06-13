import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//language//
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '~/assets/Localization/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ],
  declarations: [
  ],
  exports: [
    HttpClientModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ]

})
export class SharedmoduleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedmoduleModule,
      providers: [
        HttpClientModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
      ]
    }
  }
}
