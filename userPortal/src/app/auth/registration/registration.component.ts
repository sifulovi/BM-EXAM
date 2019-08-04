import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ErrorStateMatcher} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  fullName = '';
  email = '';
  password = '';
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService , private toastr: ToastrService)  {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      address: [null, Validators.required],
      role: ['MEMBER']
    });
  }

  onFormSubmit(form: NgForm) {
    this.authService.register(form)
      .subscribe(
        (res) => {
        this.toastr.success('New Member Is Created', 'Registration is successful');
        this.router.navigate(['']);
      }, (err) => {
        this.toastr.error('Error Here :(  !!');
        console.log(err);
        alert(err.error);
      });
  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
