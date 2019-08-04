import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-deshboard',
  templateUrl: './deshboard.component.html',
  styleUrls: ['./deshboard.component.css']
})
export class DeshboardComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('token') === null) {
      this.router.navigateByUrl('');
    }
  }

}
