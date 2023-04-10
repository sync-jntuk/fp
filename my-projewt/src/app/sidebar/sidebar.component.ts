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

	goToNotifications() {
		this.router.navigateByUrl('/upload-notifications')
	}

	goToDeleteNotifications() {
		this.router.navigateByUrl('/delete-notifications')
	}

	goToUpdateRegulation() {
		this.router.navigateByUrl('/update-regulation')
	}

	goToUploadResults() {
		this.router.navigateByUrl('/upload-results')
	}

	goToUploadSupplyResults() {
		this.router.navigateByUrl('/upload-supplyresults')
	}

	goToUploadResultsCsv() {
		this.router.navigateByUrl('/upload-results-csv')
	}

	goToSemesterApplication() {
		this.router.navigateByUrl('/semester-application')
	}

	goToSupplySemesterApplication() {
		this.router.navigateByUrl('/semester-supply-application')
	}

	goToSupplyCertificateApplication() {
		this.router.navigateByUrl('/certificate-application')
	}
}
