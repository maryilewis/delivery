import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JobData } from 'src/app/interfaces/all';
import { DataService } from 'src/app/services/data.service';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-board',
  templateUrl: './job-board.component.html',
  styleUrls: ['./job-board.component.scss']
})
export class JobBoardComponent implements OnInit {
	get jobs(): JobData[] {
		return this._jobs;
	}
	
	private _jobs: JobData[];

	constructor(
		private jobService: JobService,
	) {
		this.jobService.jobs$.subscribe({
			next: (currentJobs) => {
				this._jobs = currentJobs;
			}
		})
	}
	ngOnInit(): void {
	}

}
