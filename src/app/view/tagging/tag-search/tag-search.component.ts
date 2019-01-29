import {Component, OnInit} from '@angular/core';
import {NewTagItemDialogComponent} from '../new-tag-item-dialog/new-tag-item-dialog.component';
import {MatDialog} from '@angular/material';
import {TaggingService} from '../../../service/tagging.service';
import {TagItem} from '../../../model/tagitem';

@Component({
  selector: 'app-tag-search',
  templateUrl: './tag-search.component.html',
  styleUrls: ['./tag-search.component.css']
})
export class TagSearchComponent implements OnInit {

  searchtopics: string;
  depth = 3;
  results: TagItem[] = [];

  constructor(private _taggingService: TaggingService, private _dialog: MatDialog) { }

  ngOnInit() {
  }

  tagSearch() {
    console.log('Searching...');
    this._taggingService.search(this.searchtopics, this.depth)
      .subscribe(
        (data: TagItem[]) => this.results = data,
        err => {
          console.log('could not get search results');
          this.results = [];
        }
        );
  }

  createNewTag() {
    const newTagItemDialog = this._dialog.open(NewTagItemDialogComponent, {
      width: '600px',
      data: 'data to be passed in'
    });

    /**
     * https://blog.danieleghidoli.it/2016/10/22/http-rxjs-observables-angular/
     */
    newTagItemDialog.afterClosed().subscribe( result => {
      console.log(`dialog closed: ${result}`);
      if (result) {
        this._taggingService.createTagItem(
          newTagItemDialog.componentInstance.tagItem)
          .subscribe(
            (tagItem: TagItem) =>
              console.log(`tag item ${tagItem.id} created.`),
            err => console.log('could not create tag item.')
          );
      }
    });

  }

}
