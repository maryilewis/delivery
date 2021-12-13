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
	x: 200,
	y: -10,
}, {
	id: 3,
	name: "Town 3",
	productIds: [1],
	description: "It also looks like a nice place.",
	x: -200,
	y: -100,
}, {
	id: 4,
	name: "Town 4",
	productIds: [1],
	description: "It looks like a nice place.",
	x: -400,
	y: 150,
}, {
	id: 5,
	name: "Town 5",
	productIds: [1],
	description: "It looks like a nice place.",
	x: -150,
	y: 350,
}, {
	id: 6,
	name: "Town 6",
	productIds: [3],
	description: "It looks like a nice place.",
	x: 250,
	y: 300,
}];

const ROADS: RoadData[] = [{
	id: 50,
	townId1: 1,
	townId2: 2,
	cost: 200,
}, {
	id: 51,
	townId1: 1,
	townId2: 3,
	cost: 223,
}, {
	id: 52,
	townId1: 1,
	townId2: 4,
	cost: 427,
}, {
	id: 53,
	townId1: 1,
	townId2: 5,
	cost: 380,
}, {
	id: 54,
	townId1: 1,
	townId2: 6,
	cost: 290,
}, {
	id: 55,
	townId1: 2,
	townId2: 6,
	cost: 278,
}, {
	id: 56,
	townId1: 5,
	townId2: 6,
	cost: 403,
}, {
	id: 57,
	townId1: 5,
	townId2: 4,
	cost: 320,
}, {
	id: 58,
	townId1: 4,
	townId2: 3,
	cost: 320,
}]

const PRODUCTS: ProductData[] = [{
	id: 1,
	name: "carrots",
}, {
	id: 2,
	name: "cabbage",
}, {
	id: 3,
	name: "flowers",
}]