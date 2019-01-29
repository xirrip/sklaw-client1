import { Component, OnInit } from '@angular/core';
import {LawTask} from '../../../model/law-task';
import {CaseService} from '../../../service/case.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.css']
})
export class NewTaskDialogComponent implements OnInit {

  // prov: MatNativeDateModule
  date = new FormControl(new Date());
  lawTask = new LawTask();

  constructor(private _caseService: CaseService) { }

  ngOnInit() {
  }

}
