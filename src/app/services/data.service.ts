import { Injectable } from '@angular/core';
import { TownData, RoadData, ProductData } from '../interfaces/all';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	get towns() {
		return TOWNS;
	}
	get roads() {
		return ROADS;
	}
	get products() {
		return PRODUCTS;
	}
	/**
	 * these are problematic because they are unsafe
	 */
	public getTownById(id: number): TownData {
		return TOWNS.find((town) => town.id === id);
	}

	public getRoadByID(id: number): RoadData {
		return ROADS.find((item) => item.id === id);
	}

	public getProductById(id: number): ProductData {
		return PRODUCTS.find((item) => item.id === id);
	}

	public getRandomTown(): TownData {
		return TOWNS[Math.floor(Math.random() * TOWNS.length)];
	}

	public getRandomProductBesides(blockedProductIds: number[]): ProductData {
		const otherProducts = PRODUCTS.filter((product) => !blockedProductIds.includes(product.id));
		return otherProducts[Math.floor(Math.random() * otherProducts.length)];
	}

	constructor() { }
}

const TOWNS: TownData[] = [{
	id: 1,
	name: "Town 1",
	productIds: [1],
	description: "It looks like a nice place.",
	x: 0,
	y: 0,
}, {
	id: 2,
	name: "Town 2",
	productIds: [2],
	description: "It also looks like a nice place.",
	x: 300,
	y: -10,
}, {
	id: 3,
	name: "Town 3",
	productIds: [1],
	description: "It also looks like a nice place.",
	x: -300,
	y: -30,
}];

const ROADS: RoadData[] = [{
	id: 50,
	townId1: 1,
	townId2: 2,
	cost: 30,
}, {
	id: 51,
	townId1: 1,
	townId2: 3,
	cost: 30,
}]

const PRODUCTS: ProductData[] = [{
	id: 1,
	name: "carrots",
}, {
	id: 2,
	name: "cabbage",
}]