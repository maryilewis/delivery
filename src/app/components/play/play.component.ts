import { Component, OnInit } from '@angular/core';
import { GameData, ProductData, TownData } from 'src/app/interfaces/all';
import { DataService } from 'src/app/services/data.service';
import { GameService } from 'src/app/services/game.service';
import { JobService } from 'src/app/services/job.service';

@Component({
	selector: 'app-play',
	templateUrl: './play.component.html',
	styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

	get town() {
		return this._town;
	}
	get products(): TownProductData[] {
		return this._products;
	}
	get playerName() {
		return this._playerName;
	}
	get money() {
		return this._money;
	}

	private _town: TownData;
	private _products: TownProductData[];
	private _playerName: string;
	private _money: number;

	// watch current came state from game service
	constructor(private gameService: GameService,
		private dataService: DataService,
		private jobService: JobService) {
			// for testing purposes
			this.gameService.createGame();
		this.gameService.currentGame$.subscribe({
			next: (game: GameData) => {
				this._products = game.productIds.map((value) => {
					return {
						product: this.dataService.getProductById(value),
						value: this.jobService.valueOfProductInTown(value, game.locationId)
					}
				});
				this._town = this.dataService.getTownById(game.locationId);

				this._playerName = game.name;
				this._money = game.money;
			}
		});
	}

	ngOnInit(): void {
	}

	public dropOff(productId: number) {
		console.log('dop off', productId, this.town.id);
		this.jobService.completeJob(productId, this.town.id);
	}

}
 interface TownProductData {
	 product: ProductData,
	 value: number,
 }