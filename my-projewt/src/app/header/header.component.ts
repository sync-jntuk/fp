import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {

	constructor(private router: Router) { }

	user_data: any = null

	ngOnInit(): void {
		// this.user_data = localStorage.getItem("user_data")
		// if (!this.user_data) {
		// 	this.router.navigateByUrl('/login')
		// }
		// this.user_data = JSON.parse(this.user_data)
		// this.user_data.picture = 'assets/img/' + this.user_data.picture.split("/")[2]
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
