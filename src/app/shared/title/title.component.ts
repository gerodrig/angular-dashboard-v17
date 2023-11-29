import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <h1 class="mb-5 text-3xl font-bold">{{title}}</h1> 
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class TitleComponent { 
  @Input({required: true}) title!:string;

}
