import { Component, Input, OnInit } from '@angular/core';
import { SelectionService } from 'src/app/services/selection.service';

@Component({
  selector: 'app-selected-town',
  templateUrl: './selected-town.component.html',
  styleUrls: ['./selected-town.component.scss']
})
export class SelectedTownComponent implements OnInit {

	get id(): number {
		return this._id;
	}
	private _id: number;
  constructor(private selectService: SelectionService) {
	  this.selectService.selectedTown$.subscribe({
		  next: (town) => {
			this._id = town?.id;
		  }
	  })
  }

  ngOnInit(): void {
  }

}
