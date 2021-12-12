import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JobData } from 'src/app/interfaces/all';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-job-board',
  templateUrl: './job-board.component.html',
  styleUrls: ['./job-board.component.scss']
})
export class JobBoardComponent implements OnInit {
	get jobs$() {
		return this.currentJobs.asObservable();
	}
	
	private currentJobs = new BehaviorSubject<JobData[]>([]);

	constructor(private dataService: DataService) {
		this.addNewJob();
		this.addNewJob();
		this.addNewJob();
		this.addNewJob();
		this.addNewJob();
		this.addNewJob();
		this.addNewJob();
		this.addNewJob();
	}
	ngOnInit(): void {
	}
  

	public turnIn(productId: number, locationId: number) {
		// check gameservice to see if you have the cargo and you're in the right location
		// tell gameservice to remove the cargo and increase money
		// remove the job from the list and add a new job
	}

	private addNewJob() {
		const jobList = this.currentJobs.getValue();
		jobList.unshift(this.generateJob());
		this.currentJobs.next(jobList);
	}
	private removeJob() {
		const jobList = this.currentJobs.getValue();
		jobList.pop();
		this.currentJobs.next(jobList);
	}
	private generateJob(): JobData {
		const town = this.dataService.getRandomTown();
		const product = this.dataService.getRandomProductBesides(town.productIds);

		return {
			townId: town.id,
			townName: town.name,
			productId: product.id,
			productName: product.name,
			payment: 10,
		}
	}



}
