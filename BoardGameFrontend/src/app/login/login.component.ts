import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(private router: Router, private authService: AuthService, private toast: NgToastService) { }

  username: string = "";
  password: string = "";
  user: User[] = [];

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(data => {
      this.user = data;
      sessionStorage.setItem("CurrentUser", JSON.stringify(this.user));
      sessionStorage.setItem("Username", JSON.stringify(data.username));
      sessionStorage.setItem("Email", JSON.stringify(data.email));
      this.showSuccess();
      this.router.navigate(['/', 'home']);
    }, 
    (err) => {
      console.log(err);
      this.showError();
      this.loginForm.reset();
    });
  }

  showSuccess() {
    this.toast.success({detail:"SUCCESS",summary:'User successfully logined!',duration: 2000, position:'tr'});
  }
  
  showError() {
    this.toast.error({detail:"ERROR",summary:'Username or password incorrect! Try again.',sticky:true, position:'tr'});
  }

}
