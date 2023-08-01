import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiModule } from './core/tasks-api/v1';
import { GeneralHttpInterceptor } from './helpers/general-http.interceptor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './tasks/tasks.module';
@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, TasksModule, SharedModule, ApiModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GeneralHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
