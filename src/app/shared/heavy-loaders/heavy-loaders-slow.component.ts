import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heavy-loaders-slow',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section [ngClass]="['w-full h-96', cssClass]">
    Heavy Loaders Slow
  </section>
  `,
})

export class HeavyLoadersComponent {
  @Input({ required: true }) cssClass!: string;

  constructor() {
    const start = Date.now();
    while (Date.now() - start < 3000) {
      // Artificial delay
    }
    console.log('HeavyLoadersComponent: Loaded');
  }
}
