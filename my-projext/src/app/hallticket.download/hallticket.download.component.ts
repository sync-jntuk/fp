import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BackendService } from '../services/backend/backend.service';


@Component({
	selector: 'app-hallticket.download',
	templateUrl: './hallticket.download.component.html',
	styleUrls: ['./hallticket.download.component.css']
})
export class HallticketDownloadComponent {

	constructor(private bk: BackendService) { }

	class_name: String = ''
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar'
		} else {
			this.class_name = ''
		}
	}

	ngOnInit(): void {
		this.getHallticket()
	}

	getHallticket() {
		this.bk.post('/student/get-hallticket', { roll: localStorage.getItem('roll'), exam_type: 'SUP' }).subscribe(data => {
			console.log(data)
		})
	}

	downloadPdf() {
		const context = document.getElementById('hallTicket')
		if (!context) {
			console.error('Element not found!')
			return
		}
		let filename: string = localStorage.getItem('roll') + '_hallticket.pdf'
		html2canvas(context || document.createElement('div'), { scale: 3 }).then((canvas) => {
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
