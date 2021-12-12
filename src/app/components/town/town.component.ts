import { Component, OnInit } from '@angular/core';
import { ProductData, TownData } from 'src/app/interfaces/all';
import { DataService } from 'src/app/services/data.service';
import { GameService } from 'src/app/services/game.service';

@Component({
	selector: 'app-town',
	templateUrl: './town.component.html',
	styleUrls: ['./town.component.scss']
})
export class TownComponent implements OnInit {

	get town(): TownData {
		return this._town;
	}

	get products(): ProductData[] {
		return this._products;
	}

	private _town: TownData;
	private _products: ProductData[];

	constructor(private gameService: GameService, private dataService: DataService) {
		this.gameService.currentGame$.subscribe({
			next: (game) => {
			this._town = this.dataService.getTownById(game.locationId);
			this._products = this._town.productIds.map((id) => this.dataService.getProductById(id));
			}
		})
	}

	ngOnInit(): void {
	}

	public pickUp(id) {
		this.gameService.pickUpProduct(id);
	}

}
