import { Component, OnInit } from '@angular/core';
import {LawCase} from '../model/lawcase';
import {LawClient} from '../model/lawclient';

@Component({
  selector: 'app-newcase-dialog',
  templateUrl: './newcase-dialog.component.html',
  styleUrls: ['./newcase-dialog.component.css']
})
export class NewcaseDialogComponent implements OnInit {

  lawClient: LawClient;
  lawCase: LawCase;

  constructor() {
    this.lawClient = new LawClient();
    this.lawCase = new LawCase();
  }

  ngOnInit() {
  }

}
