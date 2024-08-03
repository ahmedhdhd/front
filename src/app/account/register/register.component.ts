import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errors: string[] | null = null;
 

  constructor(
    private fb: FormBuilder, 
    private accountService: AccountService, 
    private router: Router,
    private toastr: ToastrService) {}

  complexPassword = "(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$"
  
  registerForm = this.fb.group({
    id : 0,
    fullName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: ['', [Validators.required, Validators.email], [this.validateEmailNotTaken()]],
    password: ['', [Validators.required, Validators.pattern(this.complexPassword)]],
    type : 0
  })  

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => {
        this.toastr.success('Inscription réussie !', 'Succès');
        this.router.navigateByUrl('shop');
      },
      error: error => this.errors = error.errors
    });
  }
  


  validateEmailNotTaken(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(1000),
        take(1),
        switchMap(() => {
          return this.accountService.checkEmailExists(control.value).pipe(
            map(result => result ? {emailExists: true } :null),
            finalize(() => control.markAsTouched())
          )
        })
      )
    }
  }
}
