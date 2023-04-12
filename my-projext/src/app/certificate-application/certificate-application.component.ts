import { Component } from '@angular/core';
import { BackendService } from '../services/backend/backend.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-certificate-application',
	templateUrl: './certificate-application.component.html',
	styleUrls: ['./certificate-application.component.css']
})
export class CertificateApplicationComponent {

	constructor(private router: Router, private bk: BackendService) { }

	roll: String = ''

	class_name: String = ''
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar'
		} else {
			this.class_name = ''
		}
	}

	ngOnInit() {
		this.roll = localStorage.getItem('roll') || ''
		if (!this.roll) {
			this.router.navigateByUrl('/login')
			return
		}
	}

	submitCertificate(data: any) {
		data.roll = this.roll
		data.email = localStorage.getItem('email')
		this.bk.post('/student/applyforcertificate', data).subscribe(response => {
			if (response.errno != undefined) {
				alert('certificate not valid')
			} else {
				alert('certificate requested successful')
				this.router.navigateByUrl('/certificatestatus')
			}
		})
	}

}
