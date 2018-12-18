import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public static strongPassword(control: FormControl): ValidationResult {

    let hasNumber = /\d/.test(control.value);
    let hasUpper = /[A-Z]/.test(control.value);
    let hasLower = /[a-z]/.test(control.value);

    let valid = hasNumber && hasUpper && hasLower;
    return valid ? null : { passwordNotStrong: true }
  }
}

export interface ValidationResult {
  [key: string]: boolean
}

export const EmailValidation = [
  Validators.required, 
  Validators.email, 
  Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$") 
]

export const PhoneValidation = [
  Validators.pattern("^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$")
]

export const ZipCodeValidation = [
  Validators.required,
  Validators.minLength(5), 
  Validators.maxLength(5), 
  Validators.pattern("^[0-9]{5}$")
]

export const PasswordValidation = [
  Validators.required, 
  Validators.minLength(6),
  Validators.maxLength(20), 
  ValidatorsService.strongPassword
]

export const RepeatPasswordValidation: ValidatorFn = (control: FormGroup): 
  ValidationErrors | null => {
  let password = control.get("password");
  let confirmPassword = control.get("confirmPassword");

  let match = password && confirmPassword && password.value && confirmPassword && 
      password.value.length > 4 && confirmPassword.value.length > 4 && 
      password.value !== confirmPassword.value ? 
    { "passwordsDontMatch": true } : null ;
  return match;
}
