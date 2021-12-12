import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { combineLatest } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { GameService } from 'src/app/services/game.service';
import { SelectionService } from 'src/app/services/selection.service';

@Component({
  selector: 'app-selected-road',
  templateUrl: './selected-road.component.html',
  styleUrls: ['./selected-road.component.scss']
})
export class SelectedRoadComponent implements OnInit {

	get id(): number {
		return this._id;
	}

	get built(): boolean {
		return this._built;
	}

	get cost(): number {
		return this._cost;
	}

	/** can you afford it AND is it conneted to an existing road */
	get canBuild(): boolean {
		return this._canBuild;
	}

	private _id: number;
	private _built: boolean;
	private _cost: number;
	private _canBuild: boolean;

	constructor(
		private selectService: SelectionService,
		private gameService: GameService,
	) {
		combineLatest(this.selectService.selectedRoad$, this.gameService.currentGame$).subscribe({
			next: ([road, game]) => {
				console.log('a change occurred', road);
				this._id = road?.id;
				this._cost = road?.cost;
				this._built = road ? this.gameService.isRoadBuilt(road.id) : null;
				this._canBuild = road ? game.money > this.cost : false;
			}
		})
	}

	public buildRoad() {
		// if there is a current road and it exists, per data service
		// if the road hasn't been built, per game service
		// set road to built in game service
		// game service should also subract the player's money
		this.gameService.buildRoadById(this.id, this.cost);
	}

	ngOnInit(): void {
	}

}
