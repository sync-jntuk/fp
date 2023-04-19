import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
	today_date = ''
	metadata: any = {}

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

	getMetaData() {
		this.bk.post('/admin/metadata', {}).subscribe(data => {
			console.log(data)
			for (const obj of data) {
				this.metadata[obj.key] = obj.value
			}
			console.log(this.metadata)
		})
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
		this.getMetaData()
		let date = new Date()
		this.today_date =
			(date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
			+ '.' + (date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1))
			+ '.' + date.getFullYear()
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

	downloadPdf() {
		const context = document.getElementById('certificate')
		if (!context) {
			console.error('Element not found!')
			return
		}
		let filename: string = 'certificate.pdf'
		html2canvas(context || document.createElement('div'), { scale: 3 }).then(canvas => {
			const pdf = new jsPDF('p', 'mm', 'a4')
			const imgData = canvas.toDataURL('image/png')
			const imgProps = pdf.getImageProperties(imgData)
			const pdfWidth = pdf.internal.pageSize.getWidth()
			const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
			pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
			pdf.save(filename)
		})
	}

}
