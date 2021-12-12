import { Component, Input, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
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

	get name(): string {
		return this._name;
	}

	get current(): boolean {
		return this._current;
	}

	private _id: number;
	private _name: string;
	private _current: boolean;

	constructor(
		private selectService: SelectionService,
		private gameService: GameService
	) {
		combineLatest([this.selectService.selectedTown$, this.gameService.currentGame$]).subscribe({
			next: ([town, game]) => {
				this._id = town?.id;
				this._name = town?.name;
				this._current = town ? town.id === game.locationId : false;
			}
		})
	}

	ngOnInit(): void {
	}

	public goToTown() {
		this.gameService.goToTownById(this.id);
	}
}
