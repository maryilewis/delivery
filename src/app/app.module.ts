import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewGameComponent } from './components/new-game/new-game.component';
import { LoadGameComponent } from './components/load-game/load-game.component';
import { PlayComponent } from './components/play/play.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MapComponent } from './components/map/map.component';
import { JobBoardComponent } from './components/job-board/job-board.component';
import { BuildMenuComponent } from './components/build-menu/build-menu.component';
import { TownComponent } from './components/town/town.component';
import { NotificationComponent } from './components/notification/notification.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectedTownComponent } from './components/map/selected-town/selected-town.component';
import { SelectedRoadComponent } from './components/map/selected-road/selected-road.component';

@NgModule({
  declarations: [
    AppComponent,
    NewGameComponent,
    LoadGameComponent,
    PlayComponent,
    SettingsComponent,
    MapComponent,
    JobBoardComponent,
    BuildMenuComponent,
    TownComponent,
    NotificationComponent,
    WelcomeComponent,
    SelectedTownComponent,
    SelectedRoadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	FormsModule,
	ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
