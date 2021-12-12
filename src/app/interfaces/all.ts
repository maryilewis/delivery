export interface TownData {
	id: number,
	name: string,
	productIds: number[],
	description: string,
	x: number,
	y: number,
}

export interface RoadData {
	id: number,
	townId1: number,
	townId2: number,
	cost: number,
}

export interface GameRoad {
	roadId: number,
	built: boolean,
}

export interface ProductData {
	id: number,
	name: string,
}

export interface Bike {
	capacity: number,
	speed: number,
}

export interface GameData {
	builtRoadIds: number[],
	bike: Bike,
	name: string,
	money: number,
	products: ProductData[],
	locationId: number, // location is always a town, for now
}

export interface JobData {
	productId: number;
	productName: string;
	townId: number;
	townName: string;
	payment: number;
}