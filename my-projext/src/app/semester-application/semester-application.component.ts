import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend/backend.service';

@Component({
	selector: 'app-semester-application',
	templateUrl: './semester-application.component.html',
	styleUrls: ['./semester-application.component.css']
})
export class SemesterApplicationComponent {
	constructor(private router: Router, private bk: BackendService) { }

	roll = ''
	reg = ''
	year = ''
	sem = ''
	type = ''
	subjects: any = []
	user_data: any = {}

	class_name: String = ''
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar'
		} else {
			this.class_name = ''
		}
	}

	ngOnInit(): void {
		this.user_data = localStorage.getItem("user_data")
		if (!this.user_data) {
			this.router.navigateByUrl('/login')
		}
		this.user_data = JSON.parse(this.user_data)
		this.reg = this.user_data.regulation
		this.roll = this.user_data.roll
	}

	checkParams() {
		if (this.reg != '' && this.year != '' && this.sem != '') {
			this.getSubjects({ regulation_: this.reg, year: this.year, semester: this.sem });
		}
	}

	getSubjects(params: any): void {
		this.bk.post('/regulation/subjects', params).subscribe(dt => {
			this.subjects = Object.entries(dt.subjects)
		})
	}

	applyForSemester(params: any) {
		params.subjects = {}
		for (const key of Object.keys(params)) {
			if (key.indexOf("code") == 0) {
				let subCode = key.split(" ")[1]
				if (params[key] != "") {
					params.subjects[subCode] = true
				}
				delete params[key]
			}
		}
		params.roll = this.roll
		params.regulation = this.reg
		params.exam_type = 'REG'
		params.batch = this.user_data.batch
		console.log(params)
		return
		this.bk.post('/student/applyforsemester', params).subscribe(result => {
			if (result.errno != undefined) {
				alert('application not submitted')
			} else {
				alert('application submitted successfully')
				console.log(result)
			}
		})
	}
}
