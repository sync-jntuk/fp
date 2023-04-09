import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
	constructor(private router: Router) { }

	ngOnInit(): void {
	}

	goToHome() {
		this.router.navigateByUrl('/home')
	}

	goToLogin() {
		localStorage.clear()
		this.router.navigateByUrl('/login')
	}

	goToProfile() {
		this.router.navigateByUrl('/profile')
	}

	goToContact() {
		this.router.navigateByUrl('/contact')
	}

	goToMap() {
		this.router.navigateByUrl('/map')
	}

	goToResults() {
		this.router.navigateByUrl('/result')
	}

	goToRegister() {
		this.router.navigateByUrl('/register')
	}

	goToNewsFeed() {
		this.router.navigateByUrl('/newsfeed')
	}

	goToNotifications() {
		this.router.navigateByUrl('/notifications')
	}

	goToPayment() {
		this.router.navigateByUrl('/payment')
	}

	goToSemesterApplication(type: String) {
		localStorage.setItem("Semester-Application", type + "")
		this.router.navigateByUrl('/semesterapplication')
	}
}
