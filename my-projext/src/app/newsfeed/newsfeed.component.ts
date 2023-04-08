import { Component } from '@angular/core';
import { BackendService } from '../services/backend/backend.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent {
	constructor(private bk: BackendService) { }

	ngOnInit(): void {
		this.getDefaultResult()
	}

	search: string = ''
	feeds: any = []

	getDefaultResult() {
		this.bk.get('/newsfeed/current', {}).subscribe(result => {
			console.log(result)
			for (let feed of result.feeds) {
				feed.snippet = feed.snippet.split(". ,").join("\n")
			}
			this.feeds = result.feeds
		})
	}

	getSearchResults() {
		console.log(this.search)
		this.bk.post('/newsfeed/search', { roll: localStorage.getItem('roll'), query: this.search }).subscribe(result => {
			for (let feed of result.feeds) {
				feed.snippet = feed.snippet.split(". ,").join("\n")
			}
			this.feeds = result.feeds
		})
	}
}
