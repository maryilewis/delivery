import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JobData } from '../interfaces/all';
import { DataService } from './data.service';
import { GameService } from './game.service';

@Injectable({
	providedIn: 'root'
})
export class JobService {

	get jobs$() {
		return this.currentJobs.asObservable();
	}
	
	private currentJobs = new BehaviorSubject<JobData[]>([]);

	constructor(private dataService: DataService, private gameService: GameService) {
		this.addNewJob();
		this.addNewJob();
		this.addNewJob();
		this.addNewJob();
	}

	public valueOfProductInTown(productId: number, townId: number): number {
		const relevantJobs = this.currentJobs.getValue().filter(job => job.townId === townId && job.productId === productId);
		if (relevantJobs.length) {
			return relevantJobs[0].payment
		}
		return 0;
	}

	public completeJob(productId: number, townId: number) {
		let payment = 0;
		const relevantJobs = this.currentJobs.getValue().filter(job => job.townId === townId && job.productId === productId);
		if (relevantJobs.length) {
			console.log('found a matching job');
			payment = relevantJobs[0].payment;
			this.removeSpecificJob(relevantJobs[0]);
			this.addNewJob();
		}
		this.gameService.removeProduct(productId);
		this.gameService.getPaid(payment);
		
	}

	private calculatedValueOfProductInTown(productId: number, townId: number): number {
		// use dijkstra's algorithm to find the cheapest way to get from the town to a town with productId
		const allRoads = this.dataService.roads;
		const unvisitedRoadIds = allRoads.map(road => road.id);

		// townId : cost
		const townCosts = new Map<number, number>();
		townCosts.set(townId, 0);
		let current = townId;

		// loop here
		for(var i = 0; i < allRoads.length + 5; i++) {
			const currentCost = townCosts.get(current);
			if (this.dataService.getTownById(current).productIds.includes(productId)) {
				return Math.ceil(currentCost / 2);
			}

			// get roads connecting current town to unvisited towns
			const roads = allRoads.filter(road => (road.townId1 === current || road.townId2 === current) &&
				unvisitedRoadIds.includes(road.id)).sort((a, b) => a.cost - b.cost);
			roads.forEach((road) => {
				const newTownId = (current === road.townId1) ? road.townId2 : road.townId1;
				const existingCost = townCosts.get(newTownId);
				if (!existingCost || currentCost + road.cost < existingCost) {
					townCosts.set(newTownId, currentCost + road.cost);
				}
				unvisitedRoadIds.splice(unvisitedRoadIds.indexOf(road.id), 1);
			});
			
			const options = Array.from(townCosts).filter(([id, value]) => id !== current).sort((a, b) => a[1] - b[1]);

			townCosts.delete(current);

			current = options[0][0];

		}
		return 30;
	}

	private addNewJob() {
		const jobList = this.currentJobs.getValue();
		jobList.unshift(this.generateJob());
		this.currentJobs.next(jobList);
	}
	private removeSpecificJob(job: JobData) {
		const jobList = this.currentJobs.getValue();
		jobList.splice(jobList.indexOf(job), 1);
		this.currentJobs.next(jobList);
	}
	private removeJob() {
		const jobList = this.currentJobs.getValue();
		jobList.pop();
		this.currentJobs.next(jobList);
	}
	// to do - don't generate duplicate jobs
	private generateJob(): JobData {
		const town = this.dataService.getRandomTown();
		const product = this.dataService.getRandomProductBesides(town.productIds);

		return {
			townId: town.id,
			townName: town.name,
			productId: product.id,
			productName: product.name,
			payment: this.calculatedValueOfProductInTown(product.id, town.id),
		}
	}
}