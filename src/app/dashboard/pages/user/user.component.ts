import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

import { UsersService } from '@services/users.service';

import { TitleComponent } from '@shared/title/title.component';

import type { User } from '@interfaces/req-response';

@Component({
  standalone: true,
  imports: [CommonModule, TitleComponent],
  template: `
    <app-title [title]="titleLabel()" />

    @if (user()){
      <section>
        <img [srcset]="user()!.avatar" [alt]="user()!.first_name" />
        <div>
          <h2>{{ user()!.first_name }} {{ user()!.last_name }}</h2>
          <p>{{ user()!.email }}</p>
        </div>
      </section>
     } @else {
    <div
      class="flex items-center justify-center w-full h-96 bg-gradient-to-r from-gray-200 to-gray-400 animate-pulse"
    >
      <div class="relative w-24 h-24">
        <div
          class="absolute inset-0 border-t-2 border-b-2 border-blue-700 rounded-full animate-spin"
        ></div>
        <p
          class="absolute text-gray-900 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 animate-pulse"
        >
          Loading...
        </p>
      </div>
    </div>
    }
  `,
  styles: ``,
})
export default class UserComponent {
  private route = inject(ActivatedRoute);
  private usersService = inject(UsersService);

  // public user = signal<User | undefined>(undefined);
  public user = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.usersService.getUserById(id))
    )
  );

  public titleLabel = computed(
    () => `User Information: ${this.user()?.first_name ?? ''} ${this.user()?.last_name ?? ''}`
  );

}
