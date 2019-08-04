import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email = '';
  password = '';
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private toastr: ToastrService) {
  }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/dashboard');
    }
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.authService.login(form)
      .subscribe(res => {
        console.log(res.token);
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', res.fullname);
          localStorage.setItem('role', res.role);
          localStorage.setItem('userId', res.userId);
          this.router.navigateByUrl('/dashboard');
          this.toastr.success('WellCome Dude!!');
        } else {
          this.toastr.error('Please Enter Valid Email and Password');
          this.loginForm.reset();
        }
      }, (err) => {
        if (err.status === 401) {
          this.toastr.error('Boom!!');
        }
      });
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
