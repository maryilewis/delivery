import { Component, OnInit } from '@angular/core';
import { GameData } from 'src/app/interfaces/all';
import { DataService } from 'src/app/services/data.service';
import { GameService } from 'src/app/services/game.service';

@Component({
	selector: 'app-play',
	templateUrl: './play.component.html',
	styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

	get townName() {
		return this._townName;
	}
	get productNames() {
		return this._productNames;
	}
	get playerName() {
		return this._playerName;
	}
	get money() {
		return this._money;
	}

	private _townName: string;
	private _productNames: string[] = [];
	private _playerName: string;
	private _money: number;

	// watch current came state from game service
	constructor(private gameService: GameService,
		private dataService: DataService) {
			// for testing purposes
			this.gameService.createGame();
		this.gameService.currentGame$.subscribe({
			next: (game: GameData) => {
				this._productNames = game.products.map((value) => value.name);
				this._townName = this.dataService.getTownById(game.locationId).name;
				this._playerName = game.name;
				this._money = game.money;
			}
		});
	}

	ngOnInit(): void {
	}

}
