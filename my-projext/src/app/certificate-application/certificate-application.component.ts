import { Component } from '@angular/core';
import { BackendService } from '../services/backend/backend.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
				Swal.fire('error while requesting', 'certificate is not valid', 'error')
			} else {
				Swal.fire('success', 'Certificate request successfully', 'success')
					.then(() => {
						this.router.navigateByUrl('/certificatestatus')
					})
			}
		})
	}

}
