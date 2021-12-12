import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-selected-town',
  templateUrl: './selected-town.component.html',
  styleUrls: ['./selected-town.component.scss']
})
export class SelectedTownComponent implements OnInit {
	@Input() id: number;
  constructor() { }

  ngOnInit(): void {
  }

}
