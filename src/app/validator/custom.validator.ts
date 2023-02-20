import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export class customValidator {
    static passwordRequirement(control: AbstractControl): ValidationErrors | null {
        const pass: string = control.value;
        //validation with minimum of one cpas, one number, one special charcaters and 6-10 characters
        const validationRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,10}$/;
        if(pass == '' || pass == null || validationRegex.test(pass))
            return null;
        else
            return {passwordRequirement: true}
    }

    /*confirm password validation checking */
    static passwordMatch(control: AbstractControl): ValidationErrors| null {
        const confirmPass = control.value;
        const pass = control?.parent?.value.password;
        if(confirmPass == '' || confirmPass == null || confirmPass == pass)
            return null;
        else    
            return {noMatch: true};
    }

    /*confirm password for Password change validation checking */
    static passwordChangeMatch(control: AbstractControl): ValidationErrors| null {
        const confirmPass = control.value;
        const pass = control?.parent?.value.newPassword;
        if(confirmPass == '' || confirmPass == null || confirmPass == pass)
            return null;
        else    
            return {noMatch: true};
    }

    /*onnyNumber is allowed*/
    static nominalValidation(control: AbstractControl): ValidationErrors | null{
        const value = control.value;
        const regex = /^[0-9]+$/;
        if(value == '' || regex.test(value)){
            return null;
        }
        else{
            return {nominalNumber: true};
        }

    }
}