import {Component, OnInit} from '@angular/core';
import {Member} from './member';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {MemberService} from '../member-list/member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {


  data: Member[] = [];
  displayedColumns: string[] = ['memberId', 'fullName', 'email', 'address'];

  constructor(private memberService: MemberService, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(): void {
    this.memberService.getMembers()
      .subscribe(members => {
        this.data = members;
        console.log(this.data);
      }, err => {
        console.log(err);
      });
  }
}

