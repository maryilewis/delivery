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
	get enoughMoney(): boolean {
		return this._enoughMoney;
	}

	get reachable(): boolean {
		return this._reachable;
	}

	get canBuild(): boolean {
		return !this.built && this.enoughMoney && this.reachable;
	}

	get cannotBuildReason(): string {
		if (this._built) {
			return "You have built this road! You should be proud!";
		}
		if (!this._reachable) {
			return "You need to build roads to get here before you can build this road.";
		}
		if (!this._enoughMoney) {
			return "You do not have enough money to build this road.";
		}
		return "";
	}

	private _id: number;
	private _built: boolean;
	private _cost: number;
	private _enoughMoney: boolean;
	private _reachable: boolean;

	constructor(
		private selectService: SelectionService,
		private gameService: GameService,
	) {
		combineLatest([this.selectService.selectedRoad$, this.gameService.currentGame$]).subscribe({
			next: ([road, game]) => {
				this._id = road?.id;
				this._cost = road?.cost;
				this._built = road ? this.gameService.isRoadBuilt(road.id) : null;
				this._enoughMoney = road ? game.money > this.cost : false;
				this._reachable = road ? this.gameService.canReachRoad(this._id) : false;
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
