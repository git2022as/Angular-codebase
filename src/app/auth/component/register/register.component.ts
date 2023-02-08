import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { select, Store } from '@ngrx/store'; 
import { registerAction } from 'src/app/store/actions';
import { Observable } from 'rxjs';
import { isSubmittedSelector, validationErrorsSelector } from 'src/app/store/selectors';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { backendErrorsInterface, userInterface } from 'src/app/shared/interface/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isSubmitted$: Observable<boolean>;
  validationErrors$: Observable<backendErrorsInterface | null>

  constructor(private fb: FormBuilder, 
    private authService: AuthService, 
    private store: Store,
    private router: Router) {}

  ngOnInit(): void {
    this.createRegisterForm();
    this.registerSelectorInit();
  }

  registerSelectorInit(): void{
    this.isSubmitted$ = this.store.pipe(select(isSubmittedSelector));
    this.validationErrors$ = this.store.pipe(select(validationErrorsSelector));
    //this "isSubmittedSelector" selector returns an observable hence always use pipe method to decode this
    this.validationErrors$.subscribe(res=>{
      console.log("this is backend validation error " + JSON.stringify(res));
    })
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      username : ['', [Validators.required]],
      email: ['',[Validators.email, Validators.required]],
      password: ['',[Validators.required]]
    });
  }

  signUpSubmit(): void{
    console.log(this.registerForm.value);
    let data = {
      user: this.registerForm.value
    }
    this.store.dispatch(registerAction(data));
    /*this.authService.signUpUser(data).pipe(map((res: userInterface)=>{
      return res['user'];
    })).subscribe(res=>{
      console.log(JSON.stringify(res));
    })
    this.router.navigate(['/auth/login']);*/
  }

}
