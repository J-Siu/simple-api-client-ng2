# Angular Simple API Client [![Paypal donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/donate/?business=HZF49NM9D35SJ&no_recurring=0&currency_code=CAD)

[simple-api-client-ng2](https://github.com/J-Siu/simple-api-client-ng2) is an Angular 2 api service,
which work with [simple-api-express](https://github.com/J-Siu/simple-api-express), an ExpressJs api handler.

> To enable faster update, simple-api-client-ng2 switched to Angular CLI starting 8.2.0 and use new repository https://github.com/J-Siu/ng2-simple-api-lib/
>
> The new repository contains both library and server example.
>
> All version < 8.2.0 are in old repository https://github.com/J-Siu/simple-api-client-ng2/

### Table Of Content
<!-- TOC -->

- [Install](#install)
- [Usage Flow](#usage-flow)
  - [Import into Angular 2 application typescript](#import-into-angular-2-application-typescript)
  - [API](#api)
    - [SimpleApiClient.get](#simpleapiclientget)
    - [SimpleApiClient.list](#simpleapiclientlist)
    - [SimpleApiObj.call](#simpleapiobjcall)
    - [SimpleApiObj.setErrorHandler](#simpleapiobjseterrorhandler)
  - [Error Handling](#error-handling)
- [Example](#example)
- [Contributors](#contributors)
- [Changelog](#changelog)
- [License](#license)

<!-- /TOC -->

### Install

```
npm install simple-api-client-ng2
```

### Usage Flow

#### Import into Angular 2 application (typescript)

`simple-api-client-ng2` is implemented as Angular 2 injectable service name __SimpleApiClient__.

__For module using SimpleApiClient__

Add `SimpleApiClient` into module providers:

```javascript
import { SimpleApiClient } from 'simple-api-client-ng2';

@NgModule({
	providers: [SimpleApiClient]
})
```

__For each child component using SimpleApiClient__

```javascript
import {SimpleApiClient, SimpleApiObj} from 'simple-api-client-ng2';

export class ChildComponent implement OnInit {

	apiObject: SimpleApiObj;

	constructor(private api: SimpleApiClient) { }

	ngOnInit() {
		this.apiObject = this.api.get('/demo');

		let reply = '';
		this.apiObject.call(
			'echo',
			'This is a test',
			r => this.reply = r);

		console.log(this.reply);
	}

}
```

#### API

##### SimpleApiClient.get

`SimpleApiClient.get(baseUrl: string = '/'): SimpleApiObj`
will return a SimpleApiObj configure with `baseUrl`.
Previous created SimpleApiObj will be returned if the same baseUrl is used.

```javascript
		this.apiObject = this.api.get('/demo');
```

##### SimpleApiClient.list

`SimpleApiClient.list(): string[]` will return a string array containing the baseUrl of all SimpleApiObj created.

##### SimpleApiObj.call

`SimpleApiObj.call(method, params, callback, errorHandler)`

* __method: string__ Name of api
* __params: any__ Argument of api, can be basic type like string, number, or object
* __callback: (result: any) => void__ Callback function for handling api result
*	__errorHandler: (error: any) => void = this.errorHandler__ Optional error handler to handle api call error

##### SimpleApiObj.setErrorHandler

`SimpleApiObj.setErrorHandler(handler: (any) => void)` replace SimpleApiObj default error handler with the specified one.

#### Error Handling

For detail example on error handling, please refer to
[error.component.ts](https://github.com/J-Siu/simple-api-example-ng2-express/blob/master/public/app/error.component.ts)
contain in full example below

### Example

A detail example for both
[simple-api-express](https://github.com/J-Siu/simple-api-express) and
[simple-api-client-ng2](https://github.com/J-Siu/simple-api-client-ng2).

- [simple-api-example-ng2-express](https://github.com/J-Siu/simple-api-example-ng2-express)

### Contributors

* [John Sing Dao Siu](https://github.com/J-Siu)

### Changelog

* 1.2.0
	- Publish to NPM.
* 1.2.2
	- Update package.json
	- Update Readme.md
* 1.2.3
	- Due to the rapid release cycle of Angular, to minimize update purely due to `peerDependencies`, it is modified as follow:
		`"peerDependencies": { "@angular/core": ">=2.4.0" }`

### License

The MIT License

Copyright (c) 2017

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
