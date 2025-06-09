import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CustomValidators } from '../../validators/custom-validators';

interface DocumentForm {
  documentType: string;
  documentNumber: string;
  issueDate: string;
}

@Component({
  selector: 'app-banking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './banking-form.component.html',
  styleUrls: ['./banking-form.component.css']
})
export class BankingFormComponent implements OnInit {
  bankingForm!: FormGroup;

  countries = ['Россия', 'Беларусь', 'Казахстан', 'Украина'];
  genders = ['Мужской', 'Женский'];
  transactionTypes = ['Перевод', 'Оплата', 'Пополнение'];
  currencies = ['RUB', 'USD', 'EUR'];
  documentTypes = ['Паспорт', 'СНИЛС', 'ИНН'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.bankingForm = this.fb.group({
      // Блок 1: Данные клиента
      clientData: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        middleName: ['', [Validators.minLength(2), Validators.maxLength(50)]],
        gender: ['', Validators.required],
        birthDate: ['', [Validators.required, CustomValidators.ageValidator(18)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, CustomValidators.phoneValidator()]],
        passport: ['', [Validators.required, CustomValidators.passportValidator()]]
      }),

      // Блок 2: Адрес регистрации
      address: this.fb.group({
        country: ['', Validators.required],
        region: ['', [Validators.required, Validators.minLength(3)]],
        city: ['', [Validators.required, Validators.minLength(3)]],
        street: ['', [Validators.required, Validators.minLength(3)]],
        house: ['', [Validators.required, Validators.minLength(1)]],
        apartment: ['', [Validators.pattern(/^\d+$/)]],
        postalCode: ['', [Validators.required, CustomValidators.postalCodeValidator()]]
      }),

      // Блок 3: Банковские реквизиты
      bankDetails: this.fb.group({
        accountNumber: ['', [Validators.required, CustomValidators.bankAccountValidator()]],
        bik: ['', [Validators.required, CustomValidators.bikValidator()]],
        bankName: ['', [Validators.required, Validators.minLength(3)]],
        correspondentAccount: ['', [Validators.required, CustomValidators.bankAccountValidator()]]
      }),

      // Блок 4: Информация о транзакции
      transactionInfo: this.fb.group({
        transactionType: ['', Validators.required],
        amount: ['', [Validators.required, Validators.min(0.01)]],
        currency: ['', Validators.required],
        comment: ['', Validators.maxLength(200)]
      }),

      // Блок 5: Дополнительные документы
      documents: this.fb.array([])
    });
  }

  get documentsArray(): FormArray {
    return this.bankingForm.get('documents') as FormArray;
  }

  addDocument(): void {
    const documentGroup = this.fb.group({
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required],
      issueDate: ['', Validators.required],
      file: [null, Validators.required]
    });


    documentGroup.get('documentType')?.valueChanges.subscribe((type: string | null) => {
      if (type) {
        CustomValidators.documentNumberValidator(type)
      }
    });

    this.documentsArray.push(documentGroup);
  }

  removeDocument(index: number): void {
    this.documentsArray.removeAt(index);
  }

  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.documentsArray.at(index).get('file')?.setValue(file);
      this.documentsArray.at(index).get('file')?.markAsTouched();
    }
  }


  getFieldError(controlPath: string): string {
    const control = this.getNestedControl(controlPath);
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    const errors = control.errors;

    if (errors['required']) return 'Это поле обязательно для заполнения';
    if (errors['minlength']) return `Минимальная длина: ${errors['minlength'].requiredLength} символов`;
    if (errors['maxlength']) return `Максимальная длина: ${errors['maxlength'].requiredLength} символов`;
    if (errors['email']) return 'Введите корректный email адрес';
    if (errors['min']) return `Минимальное значение: ${errors['min'].min}`;
    if (errors['pattern']) return 'Неверный формат данных';
    if (errors['minAge']) return `Минимальный возраст: ${errors['minAge'].requiredAge} лет`;
    if (errors['invalidPhone']) return 'Формат: +7 (XXX) XXX-XX-XX';
    if (errors['invalidPassport']) return 'Формат: XXXX XXXXXX';
    if (errors['invalidBankAccount']) return 'Номер счета должен содержать 20 цифр';
    if (errors['invalidBik']) return 'БИК должен содержать 9 цифр';
    if (errors['invalidPostalCode']) return 'Индекс должен содержать 6 цифр';
    if (errors['invalidDocumentNumber']) {
      const error = errors['invalidDocumentNumber'];
      return `Номер документа ${error.documentType} должен содержать ${error.expectedLength} цифр`;
    }

    return 'Поле заполнено некорректно';
  }

  private getNestedControl(path: string) {
    return path.split('.').reduce((control, key) => {
      if (control instanceof FormGroup) {
        return control.get(key);
      }
      return null;
    }, this.bankingForm as any);
  }

  isFieldInvalid(controlPath: string): boolean {
    const control = this.getNestedControl(controlPath);
    return !!(control && control.invalid && control.touched);
  }

  onSubmit(): void {
    if (this.bankingForm.valid) {
      console.log('Данные формы:', this.bankingForm.value);
      alert('Форма успешно отправлена! Данные выведены в консоль.');
    } else {
      this.markAllFieldsAsTouched();
      alert('Пожалуйста, исправьте ошибки в форме перед отправкой.');
    }
  }

  onClear(): void {
    this.bankingForm.reset();
    this.documentsArray.clear();
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.bankingForm.controls).forEach(key => {
      const control = this.bankingForm.get(key);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(nestedKey => {
          control.get(nestedKey)?.markAsTouched();
        });
      } else if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          if (arrayControl instanceof FormGroup) {
            Object.keys(arrayControl.controls).forEach(arrayKey => {
              arrayControl.get(arrayKey)?.markAsTouched();
            });
          }
        });
      } else {
        control?.markAsTouched();
      }
    });
  }

  // Форматирование телефона при вводе
  onPhoneInput(event: any): void {
    let value = event.target.value.replace(/\D/g, '');

    if (value.startsWith('7')) {
      value = value.substring(1);
    } else if (value.startsWith('8')) {
      value = value.substring(1);
    }

    if (value.length >= 10) {
      value = value.substring(0, 10);
      const formatted = `+7 (${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 8)}-${value.substring(8, 10)}`;
      this.bankingForm.get('clientData.phone')?.setValue(formatted);
    }
  }

  // Форматирование паспорта при вводе
  onPassportInput(event: any): void {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length >= 4) {
      value = value.substring(0, 10);
      const formatted = `${value.substring(0, 4)} ${value.substring(4)}`;
      this.bankingForm.get('clientData.passport')?.setValue(formatted);
    }
  }
}
