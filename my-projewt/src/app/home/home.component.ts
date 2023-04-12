import { Component } from '@angular/core';
import { BackendService } from '../services/backend/backend.service';
import { Router } from '@angular/router';

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
	notifications: any = []
	email: any = {}

	class_name: String = ''
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar'
		} else {
			this.class_name = ''
		}
	}

	ngOnInit(): void {
		this.email = localStorage.getItem("email")
		if (!this.email) {
			this.router.navigateByUrl('/login')
			return
		}
		this.getNotifications()
	}

	getNotifications() {
		this.bk.post('/notification/get', { limit: 6 }).subscribe(data => {
			console.log(data)
			this.notifications = data
		})
	}

	goToHome() {
		this.router.navigateByUrl('/home')
	}

	goToNotifications() {
		this.router.navigateByUrl('/upload-notifications')
	}

	goToProfile() {
		this.router.navigateByUrl('/profile')
	}

}
