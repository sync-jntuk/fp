import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend/backend.service';

@Component({
	selector: 'app-certificate-application',
	templateUrl: './certificate-application.component.html',
	styleUrls: ['./certificate-application.component.css']
})
export class CertificateApplicationComponent {

	constructor(private router: Router, private bk: BackendService) { }

	email: String = ''
	certifcates: any = []

	getCertificates() {
		this.bk.post('/admin/certificate-applications', { approved: false }).subscribe(response => {
			this.certifcates = response
		})
	}

	class_name: String = ''
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar'
		} else {
			this.class_name = ''
		}
	}

	ngOnInit() {
		this.email = localStorage.getItem('email') || ''
		if (!this.email) {
			this.router.navigateByUrl('/login')
			return
		}
		this.getCertificates()
	}

	approveApplications(roll: string, DU_number: string, application_type: string) {
		this.bk.post('/admin/approve-certificate-application', {
			roll: roll,
			DU_number: DU_number,
			application_type: application_type
		}).subscribe(response => {
			if (response.errno != undefined) {
				alert('certificate not approved')
			} else {
				location.reload()
			}
		})
	}

}
