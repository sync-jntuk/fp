import { Component } from '@angular/core';
import { BackendService } from '../services/backend/backend.service';

@Component({
	selector: 'app-notifications',
	templateUrl: './notifications.component.html',
	styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {

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
	}

	upload(formData: any) {
		for (let key in formData) {
			if (formData[key] === '') {
				alert(`Please Enter proper ${key}`)
				break
			}
		}
		this.bk.post('/notification/post-one', formData).subscribe(data => {
			if (data.errno != undefined) {
				alert(`Notification is not uploaded`)
			} else {
				console.log(data)
				alert(`Notification is uploaded`)
			}
		})
	}

}
