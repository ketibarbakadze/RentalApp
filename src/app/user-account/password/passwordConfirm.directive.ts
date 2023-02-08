import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordConfirm: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const newPassword = control.get('newPassword');
  const confirmPassword = control.get('newPasswordConfirm');

  if (newPassword?.value != confirmPassword?.value) {
    return { passwordConfirm: true };
  } else {
    return null;
  }
};
