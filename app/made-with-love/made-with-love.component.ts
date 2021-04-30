import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'made-with-love',
  template: `


    <router-outlet name="namedOutlet"></router-outlet>  

    Heart from router
    <ng-template #noUrl>
      {{ name }}
    </ng-template>
   

    <span [style.font-size.em]="size">
      Made with <sample-heart></sample-heart> by 
      <ng-container *ngIf="url && url.length > 0; else noUrl">
        <a [attr.href]="url" target="_blank">{{ name }}</a>
      </ng-container>
    </span>
<br/>
    <a [routerLink]="['', { outlets: { namedOutlet: ['test'] } }]">Load Heart inside router outlet</a>
  `,
  styleUrls: ['./made-with-love.component.scss']
})
export class MadeWithLoveComponent implements OnInit {
  @Input()
  public name: string;

  @Input()
  public url: string;

  @Input()
  public color: string = 'red';

  @Input()
  public size: number = 1;

  constructor(private location:Location, private router:Router){
  }

  ngOnInit() {
    if(!this.name || this.name.length === 0) {
      console.error(`Name attribute must be provided!`);
    }
  }
}