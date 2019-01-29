import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../../service/client.service';
import {LawClient} from '../../../model/lawclient';
import {LawCase} from '../../../model/lawcase';
import {CaseService} from '../../../service/case.service';
import {NewTagItemDialogComponent} from '../../tagging/new-tag-item-dialog/new-tag-item-dialog.component';
import {TagItem} from '../../../model/tagitem';
import {MatDialog} from '@angular/material';
import {NewTaskDialogComponent} from '../new-task-dialog/new-task-dialog.component';
import {LawTask} from '../../../model/law-task';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.css']
})
export class CaseDetailsComponent implements OnInit {

  _caseId: number;
  lawClient = new LawClient();
  lawCase = new LawCase();
  lawTasks: LawTask[] = [];

  constructor(private _router: Router, private _route: ActivatedRoute,
              private _clientService: ClientService, private _caseService: CaseService, private _dialog: MatDialog) {

    this._route.params.subscribe( p => this._caseId = p['id']);

    if (!this._caseId) {
      this._router.navigate(['cases']);
    }
  }

  ngOnInit() {
    this._caseService.getCase(this._caseId).subscribe(c => {
        this.lawCase = c;
        this.lawClient = c.mainClient;
      },
      error => this._router.navigate(['cases'])
    );

    this._caseService.getTasks(this._caseId).subscribe( (t: LawTask[]) => this.lawTasks = t, err => console.log('could not get tasks.') );
  }

  onUpdate() {
    this._caseService.updateCase(this.lawCase).subscribe(any => {}, error => alert('save failed'));
  }

  createNewTask() {
    const newTaskDialog = this._dialog.open(NewTaskDialogComponent, {
      width: '600px',
      data: 'data to be passed in'
    });

    newTaskDialog.afterClosed().subscribe( result => {
      console.log(`dialog closed: ${result}`);
      if (result) {
        const theTask = newTaskDialog.componentInstance.lawTask;
        theTask.dueDate = newTaskDialog.componentInstance.date.value;

        this._caseService.createTask(this.lawCase, theTask)
          .subscribe(
            (lawTask: LawTask) => {
              console.log(`tag item ${lawTask.id} created.`);
              this.lawTasks.push(lawTask);
            },
            err => console.log('could not create task item.')
          );
      }
    });

  }
}
