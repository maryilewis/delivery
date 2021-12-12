import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-selected-road',
  templateUrl: './selected-road.component.html',
  styleUrls: ['./selected-road.component.scss']
})
export class SelectedRoadComponent implements OnInit {
	@Input() id: number;
  constructor() {
  }

  ngOnInit(): void {
  }

}
