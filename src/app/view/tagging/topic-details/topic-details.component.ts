import { Component, OnInit } from '@angular/core';
import {LawClient} from '../../../model/lawclient';
import {LawCase} from '../../../model/lawcase';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../../service/client.service';
import {TagTopic} from '../../../model/tagTopic';
import {TagItem} from '../../../model/tagitem';
import {TaggingService} from '../../../service/tagging.service';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.css']
})
export class TopicDetailsComponent implements OnInit {

  _topicId: number;
  topic = new TagTopic();
  linkedTopics: TagTopic[] = [];
  linkedItems: TagItem[] = [];

  constructor(private _router: Router, private _route: ActivatedRoute, private _taggingService: TaggingService) {
    this._route.params.subscribe( p => {
      this._topicId = p['id'];
      this.refreshTopic();
    });

    if (!this._topicId) {
      this._router.navigate(['/tags/topics']);
    }

  }

  ngOnInit() {
    this.refreshTopic();
  }

  refreshTopic() {
    this._taggingService.getTopic(this._topicId).subscribe(t => this.topic = t, error => this._router.navigate(['/tags/topics']));
    this._taggingService.getLinkedTopics(this._topicId).subscribe(t => this.linkedTopics = t, error => this.linkedTopics = []);
    this._taggingService.getLinkedItems(this._topicId).subscribe(t => this.linkedItems = t, error => this.linkedItems = []);
  }

  onUpdate() {
    this._taggingService.updateTopic(this.topic).subscribe(any => {}, error => alert('save failed'));
  }

}
