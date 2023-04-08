import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend/backend.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent {
	constructor(private router: Router, private bk: BackendService) { }

	queries: Number = 0
	logins: Number = 0
	global_queries: Number = 0
	global_logins: Number = 0
	user_data: any = {}

	ngOnInit(): void {
		this.user_data = localStorage.getItem("user_data")
		if (!this.user_data) {
			this.router.navigateByUrl('/login')
			return
		}
		this.user_data = JSON.parse(this.user_data)
		console.log(this.user_data)
		this.bk.post('/student/metadata',{ roll: this.user_data.roll }).subscribe(data => {
			console.log(data)
			this.logins = data.logins.total
			this.queries = data.queries.total
			this.global_logins = data.global[0].value
			this.global_queries = data.global[1].value
		})
	}

	goToHome() {
		this.router.navigateByUrl('/home')
	}

	goToProfile() {
		this.router.navigateByUrl('/profile')
	}

	goToNewsFeed() {
		this.router.navigateByUrl('/newsfeed')
	}

}
