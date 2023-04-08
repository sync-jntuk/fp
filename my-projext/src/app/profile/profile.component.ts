import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend/backend.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

	constructor(private router: Router, private bk: BackendService) { }

	user_data: any = null

	ngOnInit(): void {
		this.user_data = localStorage.getItem("user_data")
		if (!this.user_data) {
			this.router.navigateByUrl('/login')
		}
		this.user_data = JSON.parse(this.user_data)
		this.user_data.picture = 'assets/img/' + this.user_data.picture.split("/")[2]
	}

	updateProfile(params: any) {
		if (params.name) {
			let name: [string] = params.name.split(' ')
			params.first_name = name.join(' ')
			params.last_name = name[name.length - 1]
			name.pop()
		}
		params.roll = this.user_data.roll
		console.log(params)
		this.bk.post('/student/updateprofile', params).subscribe(data => {
			localStorage.setItem("user_data", JSON.stringify(data._doc))
			this.user_data = data._doc
			console.log(data._doc)
		})
	}

}
