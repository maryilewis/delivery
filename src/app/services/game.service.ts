import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameData } from '../interfaces/all';
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
		console.log(gameString);
		const gameObj = JSON.parse(gameString);
		console.log('obj', gameObj);
		this.currentGame.next(gameObj);
	}
	
	public getGameString(): string {
		return JSON.stringify(this.currentGame.getValue());
	}

	public isRoadBuilt(roadId: number): boolean {
		return this.currentGame.getValue().builtRoadIds.includes(roadId);
	}

	private randomName(): string {
		return `${FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]} ${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]}`;
	}
}


const NEW_GAME: GameData = {
	builtRoadIds: [50],
	bike: {
		capacity: 1,
		speed: 1,
	},
	name: 'Daffodil Jam',
	money: 35,
	products: [],
	locationId: 1
};

const FIRST_NAMES = ['Daffodil', 'Acorn', 'Oak', 'Leaf', 'Twig', 'Persimmon', 'Cinnamon', 'Blackberry', 'Bramble', 'Thimble', 'Nimble', 'Nettle', 'Eiderdown', 'Teacup', 'Whisper', 'Ripple', 'Ruffle', 'Creek', 'Brook', 'Swift', 'Snapdragon', 'Wicket', 'Wicker', 'Toadstool', 'Morel', 'Flossy', 'Hattie', 'Hazel', 'Willie', 'Cora', 'Whimsy', 'Mint', 'Cardamom', 'Ivy', 'Harper', 'Candle', 'Windy', 'Nutmeg', 'Basil', 'Weatherby', 'Bartleby', 'Daisy', 'Needle', 'Heather', 'Lilac', 'Rosemary', 'Lavender', 'Tea', 'Penny'];
const LAST_NAMES = ['Codswallop', 'Cobblestone', 'Cobblepot', 'Swallowtail', 'Witchhazel', 'Arrowroot', 'Drifter', 'Puddle', 'Muddle', 'Tealeaf', 'Teatree', 'Treeleaf', 'Chamomile', 'Root', 'Wither', 'Hither', 'Thither', 'Willow', 'Woods', 'Path', 'Fog', 'Marsh', 'Branch', 'Fiddle', 'Hearth', 'Candlestick', 'Meadows', 'Rivulet', 'Tarragon', 'Campside', 'Riverside', 'Lakeside', 'Shore', 'Cotton', 'Wool', 'Seedpod', 'Needlepoint', 'Pincushion', 'Larkspur', 'Tin'];
