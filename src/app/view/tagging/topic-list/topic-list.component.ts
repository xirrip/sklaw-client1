import {Component, OnInit} from '@angular/core';
import {TagTopic} from '../../../model/tagTopic';
import {TaggingService} from '../../../service/tagging.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {

  topics: TagTopic[] = [];

  constructor(private _taggingService: TaggingService) { }

  ngOnInit() {
    console.log('getting topics');
    this._taggingService.getTopics().subscribe((data: TagTopic[]) => this.topics = data,
      error => this.topics = []);
  }

}
