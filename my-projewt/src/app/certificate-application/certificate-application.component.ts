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
	img_src: string = ''
	show_img: boolean = false
	flag: boolean = true

	getCertificates() {
		this.bk.post('/admin/certificate-applications', { approved: false }).subscribe(response => {
			this.certifcates = response
			console.log(response)
		})
	}

	view(img_src: string) {
		this.img_src = img_src
		this.show_img = true
		this.flag = false
		setTimeout(() => {
			this.flag = true
		}, 500)
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
		document.addEventListener('click', () => {
			if (this.flag) {
				this.show_img = false
				this.img_src = ''
			}
		})
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
