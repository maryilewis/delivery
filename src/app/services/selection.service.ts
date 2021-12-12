import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { TownData, RoadData } from '../interfaces/all';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
	// This is the town whose details you are viewing, not the town you are in
	get selectedTown$(): Observable<TownData> {
		return this._selectedTown.asObservable();
	}

	public selectTownById(id: number) {
		// is this a valid target?
		const town = this.dataService.getTownById(id);
		// deselect road
		// get details and overwrite selected town
		this._selectedTown.next(town);
	}
	// This is the road whose details you are viewing, not the road you are on
	get selectedRoad$(): Observable<RoadData> {
		return this._selectedRoad.asObservable();
	}

	public selectedRoadById(id: number) {
		// is this a valid target?
		const road = this.dataService.getRoadByID(id);
		// deselect town
		// get details and overwrite selected road
		this._selectedRoad.next(road);
		
	}
	private _selectedTown = new BehaviorSubject<TownData>(null);
	private _selectedRoad = new BehaviorSubject<RoadData>(null);
  constructor(private dataService: DataService) { }
}
