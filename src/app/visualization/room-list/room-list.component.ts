import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  str = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel condimentum mauris. Etiam rhoncus non erat ac scelerisque. Sed maximus mauris eget posuere gravida. Sed rhoncus at mauris sit amet bibendum. Morbi rhoncus augue pulvinar malesuada accumsan. Nam feugiat eget turpis et egestas. Fusce enim nisl, tincidunt vitae luctus sit amet, ullamcorper vitae risus. Duis sodales ipsum id est euismod laoreet. Aliquam posuere mi dui, eu egestas ex consequat nec. Vivamus laoreet eros nec justo molestie scelerisque. Fusce id mi in nisl bibendum commodo et tincidunt augue. In ac purus non quam lobortis sodales. Aliquam quis nisi eu tellus scelerisque interdum quis eu purus.';

  constructor() { }

  ngOnInit() {
  }

}
