import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameData, RoadData, TownData } from '../interfaces/all';
import { FileService } from './file.service';

@Injectable({
	providedIn: 'root'
})
export class GameService {

	get currentGame$(): Observable<GameData> {
		return this.currentGame.asObservable();
	}

	get currentTownId(): number {
		return this.currentGame.getValue().locationId;
	}

	private currentGame = new BehaviorSubject<GameData>(null);

	constructor(private fileService: FileService) { }

	public createGame() {
		this.currentGame.next(Object.assign(NEW_GAME, {name: this.randomName()}));
		this.fileService.saveGame(NEW_GAME);
	}

	public loadGameFromString(gameString: string) {
		const gameObj = JSON.parse(gameString);
		this.currentGame.next(gameObj);
	}
	
	public getGameString(): string {
		return JSON.stringify(this.currentGame.getValue());
	}

	public isRoadBuilt(roadId: number): boolean {
		return this.currentGame.getValue().builtRoadIds.includes(roadId);
	}

	public buildRoadById(roadId: number, cost: number) {
		const game = this.currentGame.getValue();
		// check if it's built
		// check for enough money
		game.builtRoadIds.push(roadId);
		game.money -= cost;
		this.currentGame.next(game);
	}

	public goToTownById(id: number) {
		const game = this.currentGame.getValue();
		// check if it's a real location
		// check if there are roads from your current location to where you are trying to go
		game.locationId = id;
		this.currentGame.next(game);
	}

	public pickUpProduct(id: number) {
		// are you at capacity?
		const game = this.currentGame.getValue();
		// check if it's a real product
		game.productIds.push(id);
		this.currentGame.next(game);
	}

	public removeProduct(id: number) {
		const game = this.currentGame.getValue();
		// check if it's a real product
		game.productIds.splice(game.productIds.indexOf(id), 1);
		this.currentGame.next(game);
	}

	public getPaid(amount: number) {
		const game = this.currentGame.getValue();
		game.money += amount;
		this.currentGame.next(game);
	}

	private randomName(): string {
		return `${FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]} ${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]}`;
	}
}


const NEW_GAME: GameData = {
	builtRoadIds: [],
	bike: {
		capacity: 1,
		speed: 1,
	},
	name: 'Daffodil Jam',
	money: 300,
	productIds: [],
	locationId: 1
};

const FIRST_NAMES = ["Spool", "Thread", "Penny", "Green", "Fable", "Myth", "Flag", "String", "Fret", "Bow", "Trick", "Dash", "Dodge", "Flicker", "Candle", "Flame", "Pick", "Neck", "Pit", "Fern", "Ramble", "Briar", "Thorn", "Root", "Bark", "Petal", "Stem", "Stone", "Rock", "Mulch", "Cob", "Spark", "Jute", "Twine", "Nib", "Candle", "Bee", "Clay", "Bell", "Clover", 'Nettle', 'Daffodil', 'Acorn', 'Oak', 'Leaf', 'Twig', 'Persimmon', 'Cinnamon', 'Blackberry', 'Bramble', 'Thimble', 'Nimble', 'Nettle', 'Eiderdown', 'Teacup', 'Whisper', 'Ripple', 'Ruffle', 'Creek', 'Brook', 'Swift', 'Snapdragon', 'Wicket', 'Wicker', 'Toadstool', 'Morel', 'Flossy', 'Hattie', 'Hazel', 'Willie', 'Cora', 'Whimsy', 'Mint', 'Cardamom', 'Ivy', 'Harper', 'Candle', 'Windy', 'Nutmeg', 'Basil', 'Weatherby', 'Bartleby', 'Daisy', 'Needle', 'Heather', 'Lilac', 'Rosemary', 'Lavender', 'Tea', 'Penny', 'Lace', 'Pearl'];
const LAST_NAMES = ["Chatterby", "Copperpot", "Yarn", "Cowlick", "Haypenny", "Fields", "Meadows", "Lyrical", "Cattail", "Milkweed", "Cornsilk", "Hayseed", "Burrow", "Warren", "Timber", "Potter", "Cottage", "Calico", "Gingham", "Picnic", "Dogwood", "Milkweed", "Fiddlehead", "Husk", "Sparkles", "Moonglow", "Starlight", "Sparkles", "Mill", "Cobbler", "Jam", "Reflection", "Preserve", 'Thistledown', 'Babble', 'Willow-Whistle', 'Codswallop', 'Cobblestone', 'Cobblepot', 'Swallowtail', 'Witchhazel', 'Arrowroot', 'Drifter', 'Puddle', 'Muddle', 'Tealeaf', 'Teatree', 'Treeleaf', 'Chamomile', 'Root', 'Wither', 'Hither', 'Thither', 'Willow', 'Woods', 'Path', 'Fog', 'Marsh', 'Branch', 'Fiddle', 'Hearth', 'Candlestick', 'Meadows', 'Rivulet', 'Tarragon', 'Campside', 'Riverside', 'Lakeside', 'Shore', 'Cotton', 'Wool', 'Seedpod', 'Needlepoint', 'Pincushion', 'Larkspur', 'Tin', 'Tatter', 'Hook', 'Weather', 'Basket'];
