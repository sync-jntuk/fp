import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend/backend.service';
import { Form } from '@angular/forms';
import { UploadService } from '../services/upload/upload.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

	constructor(private router: Router, private bk: BackendService, private upload: UploadService) { }

	user_data: any = null

	ngOnInit(): void {
		this.user_data = localStorage.getItem("user_data")
		if (!this.user_data) {
			this.router.navigateByUrl('/login')
		}
		this.user_data = JSON.parse(this.user_data)
		this.user_data.picture = 'assets/img/' + this.user_data.picture.split("/")[2]
	}

	updateProfile(params: any) {
		if (params.name) {
			let name: [string] = params.name.split(' ')
			params.first_name = name.join(' ')
			params.last_name = name[name.length - 1]
			name.pop()
		}
		params.roll = this.user_data.roll
		console.log(params)
		this.bk.post('/student/updateprofile', params).subscribe(data => {
			localStorage.setItem("user_data", JSON.stringify(data._doc))
			this.user_data = data._doc
			console.log(data._doc)
		})
	}

	uploadFile() {
		this.upload.uploadFile('/upload/profile-picture', this.formData).subscribe((event: any) => {
			if (event.body) {
				console.log(event.body);
				this.user_data.picture = event.body.path
				console.log(this.user_data)
			}
		});
	}

	formData: FormData = new FormData()
	handleFileInput(event: any) {
		const fileToUpload = event.target.files.item(0)
		this.formData.append('file_to_upload', fileToUpload)
	}

}
