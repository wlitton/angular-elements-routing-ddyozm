import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { MadeWithLoveComponent } from './made-with-love/made-with-love.component';
import { HeartComponent } from './heart/heart.component';
import { Router, RouterModule } from '@angular/router';

import { Location } from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'test', outlet: "namedOutlet", component:HeartComponent , data: { class: "" }}
    ], {useHash: true})
  ],
  declarations: [
    MadeWithLoveComponent,
    HeartComponent
  ],
  entryComponents: [
    MadeWithLoveComponent,
    HeartComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector, private router:Router, private location:Location) {
    const madeWithLoveElement = createCustomElement(MadeWithLoveComponent, { injector });
    const heartElement = createCustomElement(HeartComponent, { injector });

    customElements.define('made-with-love', madeWithLoveElement);
    customElements.define('sample-heart', heartElement);


    //on every route change tell router to navigate to defined route
    this.location.subscribe((data)=>{
      console.log("Data subscribe", data);
      this.router.navigateByUrl(data.url);
    });

    //using this router outlet is loaded normaly on init
    this.router.navigateByUrl(this.location.path(true));


    //event subscribe to detect route change inside angular
    this.router.events.subscribe((data)=>{
      console.log(data);
    });
  }

  ngDoBootstrap() { }
}