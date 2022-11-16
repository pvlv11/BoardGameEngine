import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgToastModule, NgToastService } from 'ng-angular-popup'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;

  username: string = "";
  email: string = "";
  password1: string = "";
  password2: string = "";
  response: string = "";

  constructor(private router: Router, private authService: AuthService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    this.authService.register(this.username, this.email, this.password1).subscribe(data => {
      console.log("rejestrujemy!")
      this.showSuccess();
      this.router.navigate(['/', 'login']);
    }, 
    (err) => {
      console.log("nie rejestrujemy!");
      this.showError();
    });
  }

  checkPasswords(password1: String, password2: String) {
      if (password1 == password2)
        return true;
      else
        return false;
  }

  disableButton() {
    if (this.registerForm.valid && this.checkPasswords(this.password1, this.password2))
      return false;
    else
      return true;
  }

  showSuccess() {
    this.toast.success({detail:"SUCCESS",summary:'User successfully registered! You can login now.',sticky: true, position:'tr'});
  }
  
  showError() {
    this.toast.error({detail:"ERROR",summary:'User already exists! Try with different username or email.',sticky:true, position:'tr'});
  }

}
