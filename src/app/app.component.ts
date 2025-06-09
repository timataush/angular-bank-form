import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankingFormComponent } from './components/banking-form/banking-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BankingFormComponent],
  template: `
    <div class="container-fluid">
      <header class="text-center py-4">
        <h1 class="display-4 text-primary">Форма создания банковской транзакции</h1>
        <p class="lead text-muted">Внутренний банковский сервис</p>
      </header>
      <app-banking-form></app-banking-form>
    </div>
  `
})
export class AppComponent {
  title = 'angular-banking-form';
}
