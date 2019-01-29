import { Component, OnInit } from '@angular/core';
import {TagItem} from '../../../model/tagitem';

@Component({
  selector: 'app-new-tagitem-dialog',
  templateUrl: './new-tag-item-dialog.component.html',
  styleUrls: ['./new-tag-item-dialog.component.css']
})
export class NewTagItemDialogComponent implements OnInit {

  tagItem = new TagItem();

  constructor() { }

  ngOnInit() {
    this.tagItem.universe = 'public';
  }

}
