import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {

	constructor(private router: Router) { }

	email: any = null

	ngOnInit(): void {
		this.email = localStorage.getItem("email")
		if (!this.email) {
			this.router.navigateByUrl('/login')
		}
	}

	goToHome() {
		this.router.navigateByUrl('/home')
	}
	goToProfile() {
		this.router.navigateByUrl('/profile')
	}
	logout() {
		localStorage.clear()
		this.router.navigateByUrl('/login')
	}

}
