import {Component, OnInit} from '@angular/core';
import {LawCase} from '../../model/lawcase';
import {LawClient} from '../../model/lawclient';
import {CaseService} from '../../service/case.service';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.css']
})
export class CaseListComponent implements OnInit {

  lawcases: LawCase[] = [];

  constructor(private _caseService: CaseService) { }

  ngOnInit() {
    console.log('getting cases');
    this._caseService.getCases().subscribe((data: LawCase[]) => this.lawcases = data,
      error => this.lawcases = []);
  }

}
