import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
	selector: 'app-new-game',
	templateUrl: './new-game.component.html',
	styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

	constructor(private gameService: GameService,
	private router: Router) { }

	ngOnInit(): void {
	}

	public createGame() {
	this.gameService.createGame();
	this.router.navigate(['/play', {}]);
	}

}
