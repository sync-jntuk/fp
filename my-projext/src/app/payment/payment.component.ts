import { Component } from '@angular/core';

@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

	constructor() {}

	ngOnInit(): void {

	}

	confirmPayment(formData: any) {
		const keys = ["roll", "name", "email", "purpose", "amount"]
		let link = 'http://127.0.0.1:3000/payment'
		for (const key of keys) {
			if (formData[key] === "") {
                alert("Please fill all fields")
                return
            }
			link += '/' + formData[key]
		}
		location.href = link
	}

}
