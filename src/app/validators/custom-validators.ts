import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  static ageValidator(minAge: number = 18): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const birthDate = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 < minAge ? { minAge: { requiredAge: minAge, actualAge: age - 1 } } : null;
      }

      return age < minAge ? { minAge: { requiredAge: minAge, actualAge: age } } : null;
    };
  }

  static phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
      return phonePattern.test(control.value) ? null : { invalidPhone: true };
    };
  }

  static passportValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const passportPattern = /^\d{4} \d{6}$/;
      return passportPattern.test(control.value) ? null : { invalidPassport: true };
    };
  }

  static bankAccountValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const accountPattern = /^\d{20}$/;
      return accountPattern.test(control.value) ? null : { invalidBankAccount: true };
    };
  }

  static bikValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const bikPattern = /^\d{9}$/;
      return bikPattern.test(control.value) ? null : { invalidBik: true };
    };
  }

  static postalCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const postalPattern = /^\d{6}$/;
      return postalPattern.test(control.value) ? null : { invalidPostalCode: true };
    };
  }

  static documentNumberValidator(documentType: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || !documentType) {
        return null;
      }

      let pattern: RegExp;
      let expectedLength: number;

      switch (documentType) {
        case 'Паспорт':
          pattern = /^\d{10}$/;
          expectedLength = 10;
          break;
        case 'СНИЛС':
          pattern = /^\d{11}$/;
          expectedLength = 11;
          break;
        case 'ИНН':
          pattern = /^\d{12}$/;
          expectedLength = 12;
          break;
        default:
          return null;
      }

      return pattern.test(control.value) ? null : {
        invalidDocumentNumber: {
          expectedLength,
          actualLength: control.value.length,
          documentType
        }
      };
    };
  }
}
