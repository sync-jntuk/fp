import { Component } from '@angular/core';
import { BackendService } from '../services/backend/backend.service';

@Component({
	selector: 'app-semester-application',
	templateUrl: './semester-application.component.html',
	styleUrls: ['./semester-application.component.css']
})
export class SemesterApplicationComponent {

	constructor(private bk: BackendService) { }

	ngOnInit(): void {
		this.getApplications()
	}

	year_map(year: number): string {
		let arr = ["1st year", "2nd year", "3rd year", "4th year"]
		return arr[year - 1]
	}

	semester_map(semester: number): string {
		let arr = ["1st semester", "2nd semester"]
		return arr[semester - 1]
	}

	applications: any = []

	getApplications() {
		this.bk.post('/admin/semester-applications', { exam_type: 'REG' }).subscribe(data => {
			this.applications = data
			console.log(data)
		})
	}

}
