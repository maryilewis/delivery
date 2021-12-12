import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadGameComponent } from './components/load-game/load-game.component';
import { NewGameComponent } from './components/new-game/new-game.component';
import { PlayComponent } from './components/play/play.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [{
	path: '',
	component: WelcomeComponent,
}, {
	path: 'new',
	component: NewGameComponent,
}, {
	path: 'load',
	component: LoadGameComponent,
}, {
	path: 'play',
	component: PlayComponent,
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
