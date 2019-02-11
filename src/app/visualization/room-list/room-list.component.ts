import {Component, Input, OnInit} from '@angular/core';
import {RoomModel} from '../../models/tour.model';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  @Input() roomList: RoomModel[];

  constructor() { }

  ngOnInit() {
  }

  dragStart(event: DragEvent, room: RoomModel) {
    event.dataTransfer.setData('text', room.id);
  }

}
