import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MemberService} from './member.service';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {Member} from '../member/member';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  displayedColumns: string[] = ['userId', 'fullName', 'email', 'address'];
  searchKey: string;
  data: Member[] = [];
  dataSource: any;
  user: any;
  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private service: MemberService) {
  }

  ngOnInit() {
      this.service.getMembers()
        .subscribe(members => {
          this.data = members;
          this.dataSource = new MatTableDataSource(members);
          this.dataSource.paginator = this.paginator;
        });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
}

