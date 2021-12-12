import { Injectable } from '@angular/core';
import { GameData } from '../interfaces/all';

@Injectable({
	providedIn: 'root',
})
export class FileService {

	constructor() {}

	public loadGameFromStorage(gameId: string) {}
	
	public getStoredGames() {}

	public saveGame(game: GameData) {

	}

}
