import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag-search',
  templateUrl: './tag-search.component.html',
  styleUrls: ['./tag-search.component.css']
})
export class TagSearchComponent implements OnInit {

  searchtopics: string;

  constructor() { }

  ngOnInit() {
  }

  tagSearch() {
    console.log('Searching...');
  }
}
