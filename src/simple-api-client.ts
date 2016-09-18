import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SimpleApiClient {

	private apiObjArray: SimpleApiObj[] = [];

	constructor(private http: Http) { }

	get(baseUrl: string = '/'): SimpleApiObj {

		if (!this.apiObjArray[baseUrl]) {
			this.apiObjArray[baseUrl] = new SimpleApiObj(baseUrl, this.http);
		}
		return this.apiObjArray[baseUrl];
	}

	list(): string[] {
		return Object.keys(this.apiObjArray);
	}
}

export class SimpleApiObj {
	private errorHandler: (any) => void;
	private baseUrl;
	private urljoin = require('url-join');

	constructor(url: string, private http: Http) {
		this.errorHandler = this.defaultErrorHandler;
		this.baseUrl = url;
	}

	setErrorHandler(handler: (any) => void) {
		this.errorHandler = handler;
	}

	call(
		method: string,	// Name of api
		params: any, // Argument of api
		callback: (result: any) => void,
		errorHandler: (error: any) => void = this.errorHandler) {

		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ 'headers': headers });
		let url = this.urljoin(this.baseUrl, method);
		this.http.post(url, JSON.stringify({ params: params }), options)
			.map(r => r.json())
			.do(r => { if (r.error) { throw r.error; } })
			.subscribe(i => callback(i.result), errorHandler);
	}

	private defaultErrorHandler(error: any) {
		//let errMsg = (error.message) ? error.message :
		//	error.status ? `${error.status} - ${error.statusText}` : 'Web Server error';
		console.error('SimpleApi: Error: ' + JSON.stringify(error));
	}
}
