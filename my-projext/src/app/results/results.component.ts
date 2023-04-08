import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend/backend.service';

@Component({
	selector: 'app-results',
	templateUrl: './results.component.html',
	styleUrls: ['./results.component.css']
})
export class ResultsComponent {

	constructor(private router: Router, private bk: BackendService) { }


	result: any= {}
	user_data: any = {}
	ryear = 0
	rsem = 0
	gradeMap: any = {
		10: 'O', 9: 'S', 8: 'A', 7: 'B', 6: 'C', 5: 'D', 0: 'F'
	}

	ngOnInit(): void {
		this.ryear = 0
		this.rsem = 0
		this.user_data = localStorage.getItem("user_data")
		if(!this.user_data) {
			this.router.navigateByUrl('/login')
			return
		}
		this.user_data = JSON.parse(this.user_data)
	}

	getResult(params: any) {
		console.log(params)
		params.roll = this.user_data.roll
		// return
		this.bk.post('/student/result', params).subscribe(data => {
			console.log(data)
			this.ryear = params.year
			this.rsem = params.semester
			this.result = data
			this.result.subjects = Object.entries(this.result.subjects)
		})
	}

}
