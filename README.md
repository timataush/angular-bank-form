# 📋 Bank Transaction Form Application

This is an Angular-based web application designed to simulate a complex internal banking form. The application demonstrates advanced form handling using **Reactive Forms**, **custom validators**, **FormArray**, and modular component architecture.

---

## 🎯 Project Purpose

The goal of this project is to implement a sophisticated form interface that collects client data, banking details, and transaction information. It showcases Angular best practices in handling forms, validation, dynamic inputs, and responsive UI/UX.

---

## 🛠 Technologies Used

- Angular CLI v17+
- Angular Reactive Forms
- TypeScript
- Angular Material
- Custom Form Validators
- FormArray
- CSS

---

## 🚀 Getting Started

To run the application locally:

```bash
git clone https://github.com/timataush/angular-bank-form.git
cd angular-bank-form
npm install
ng serve
```


🧱 Project Structure
```
src/
└── app/
    ├── components/
    │   └── banking-form/
    │       ├── banking-form.component.ts
    │       ├── banking-form.component.html
    │       └── banking-form.component.css
    │
    ├── image/
    │   └── bank.ico
    │
    ├── validators/
    │   └── custom-validators.ts
    │
    ├── app.component.ts
    ├── app.config.ts
    ├── app.css
    ├── app.html
    ├── app.routes.ts
    ├── app.spec.ts
    ├── app.ts
    │
    ├── index.html
    ├── main.ts
    └── styles.css

.editorconfig
.gitignore
```

## 📌 Form Sections
The main form is divided into 5 logical sections:
- 1. Client Information
   First Name (required, 2-50 characters)
   Last Name (required, 2-50 characters)
   Middle Name (optional, if present: 2-50 characters)
   Gender (dropdown: Male, Female)
   Date of Birth (required, must be 18+)
   Email (required, valid email format)
   Phone Number (required, format: +7 (XXX) XXX-XX-XX)
   Passport Series and Number (required, format: XXXX XXXXXX)
- 2. Registration Address
   Country (dropdown, required)
   Region (required, min 3 characters)
   City (required, min 3 characters)
   Street (required, min 3 characters)
   House Number (required, min 1 character)
   Apartment (optional, digits only)
   Postal Code (required, exactly 6 digits)
- 3. Banking Details
   Account Number (required, 20 digits)
   Bank BIC (required, 9 digits)
   Bank Name (required, min 3 characters)
   Correspondent Account (required, 20 digits)
- 4. Transaction Details
   Transaction Type (dropdown: Transfer, Payment, Deposit)
   Transaction Amount (required, > 0)
   Currency (dropdown: RUB, USD, EUR)
   Comment (optional, max 200 characters)
- 5. Additional Documents (Dynamic - FormArray)
   Each document entry includes:
   Document Type (dropdown: Passport, SNILS, INN)
   Document Number (required, digits only, length depends on type)
   Issue Date (required, valid date)
   Add and Remove buttons for dynamic control
## ✅ Validation Rules
   Built-in Validators: Validators.required, Validators.minLength, Validators.maxLength, Validators.pattern
   Custom Validators:
   Minimum age check (18+)
   Phone number format validation
   Passport series and number pattern
   Banking fields length check
   All validation errors are shown inline below each corresponding field.
## ⚙️ Form Behavior
   Submit button is disabled until the form is completely valid.
   Error messages disappear once the user corrects the input.
   Two control buttons:
   Submit — logs form data to the console.
   Reset — clears the entire form.
## 🎨 UI/UX Design
   Built with Angular Material components.
   Responsive and accessible layout.
   Form sections are visually separated using mat-card, mat-accordion, or similar UI elements.
   Each field includes helpful tooltips or error hints where applicable.

## 📚 References
Angular Reactive Forms Guide: https://angular.io/guide/reactive-forms

Custom Validators: https://angular.io/guide/form-validation#custom-validators

Angular Material: https://material.angular.io/

## 👨‍💻 Author
Developer: [Bisiukou Timofey]

Email: timbis17.208@gmail.com

GitHub: github.com/timataush
