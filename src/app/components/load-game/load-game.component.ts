import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
	selector: 'app-load-game',
	templateUrl: './load-game.component.html',
	styleUrls: ['./load-game.component.scss']
})
export class LoadGameComponent implements OnInit {

	public gameText;
	public message = "";

	constructor(private gameService: GameService,
		private router: Router) { }

	ngOnInit(): void {
	}

	public loadGame() {
		try {
			this.gameService.loadGameFromString(this.gameText);
			this.message = "success!";
			this.router.navigate(['/play', {}]);
		} catch (err) {
			this.message = "Problem loading game";
			console.error(err);
		}
	}
}

/**
 * Test string:
 * 
{"roads":[{"roadId":1,"built":false}],"bike":{"capacity":1,"speed":1},"name":"Daffodil Jam","money":35,"products":[],"locationId":1}
 */